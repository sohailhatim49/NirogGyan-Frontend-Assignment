import Nav from "../Nav";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import "./index.css";
import { FaStethoscope, FaStar, FaLocationDot } from "react-icons/fa6";

const Profile = () => {
  const { id } = useParams();

  const apiStatusConstants = {
    initial: "INITIAL",
    inProgress: "IN_PROGRESS",
    success: "SUCCESS",
    failure: "FAILURE",
  };

  const [apiStatus, setApiStatus] = useState({
    status: apiStatusConstants.initial,
    data: null,
  });

  const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
};



  useEffect(() => {
    const getAppointments = async () => {
      setApiStatus({ status: apiStatusConstants.inProgress, data: null });

      const response = await fetch("https://www.jsonkeeper.com/b/JJIOG");
      const data = await response.json();
      if (response.ok) {
        const profileData = data.find((item) => item.id === Number(id));

        setApiStatus({
          status: apiStatusConstants.success,
          data: profileData,
        });
      } else {
        setApiStatus({
          status: apiStatusConstants.failure,
          data: null,
        });
      }
    };
    getAppointments();
  }, []);

  const renderLoadingView = () => {
    return (
      <div className="cards-section-loading">
        <ClipLoader color="#36d7b7" size={50} />
        <p>Loading...</p>
      </div>
    );
  };

  const renderSuccessView = () => {
    const { data } = apiStatus;
    const {
      name,
      patients_treated,
      profile_image,
      rating,
      specialization,
      distance_km,
      description,
      education,
      testimonials,
      available_dates
    } = data;
    return (
      <div className="profile-section">
        <div className="profile-container">
          <div className="profile-details">
            <div className="profile-header">
              <div className="profile-essentials">
                <img src={profile_image} alt={name} className="profile-image" />
                <div>
                  <h2 className="profile-name">{name}</h2>
                  <div className="specialization">
                    <FaStethoscope />
                    <p className="specialization-text">{specialization}</p>
                  </div>
                </div>
              </div>
              <div className="profile-stats">
                <p>
                  <strong>Patients Treated:</strong> {patients_treated}
                </p>
                <div className="card-rating">
                  <FaStar className="rating-icon" />
                  <p className="rating-text">{rating}</p>
                </div>
                <div className="distance">
                  <FaLocationDot className="location-icon" />
                  <p>{distance_km}km</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="profile-description-wrapper">
              <h3 className="desc-title">Description</h3>
              <p className="description">{description}</p>
            </div>
            <hr />
            <div className="education-wrapper">
              <h3 className="desc-title">Education</h3>
              <ul className="education-list">
                {education.map((each) => (
                  <li className="education-item" key={each.id}>
                    <strong>
                      <p className="education-degree">{each.degree}</p>
                    </strong>
                    <div className="college">
                      <p className="education-institution">
                        {each.institution}
                      </p>
                      <div className="dot"></div>
                      <p className="education-year">{each.year}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="education-wrapper">
              <h3 className="desc-title">Testimonials</h3>
              <ul className="education-list">
                {testimonials.map((each) => (
                  <li className="education-item" key={each.id}>
                    <strong>
                      <p className="education-degree">{each.patient_name}</p>
                    </strong>
                    <div className="college">
                      <p className="education-institution">{each.feedback}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="schedule">
            <div>
              <strong>
                <p className="education-degree">Available sessions</p>
              </strong>
              <p className="book-sub-heading">Book 1:1 sessions from the options</p>
            </div>
            <ul className="dates">
              {available_dates.map((each) => (
                
              <li className="date">{formatDate(each.date)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderProfileView = () => {
    const { status } = apiStatus;
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderSuccessView();
      default:
        return null;
    }
  };

  return (
    <div>
      <Nav />
      {renderProfileView()}
    </div>
  );
};

export default Profile;
