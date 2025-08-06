import Nav from "../Nav";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";

const Profile = (props) => {
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

  useEffect(() => {
    const getAppointments = async () => {
      setApiStatus({ status: apiStatusConstants.inProgress, data: null });

      const response = await fetch("https://www.jsonkeeper.com/b/JJIOG");
      const data = await response.json();
      if (response.ok) {
        setApiStatus({
          status: apiStatusConstants.success,
          data: data,
        });
      } else {
        setApiStatus({
          status: apiStatusConstants.failure,
          data: null,
        });
      }
      console.log(id);
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
    return (
      <div className="cards-section">
        hello
      </div>
    );
  };

  return (
    <div>
      <Nav />
      <h1>Profile Page</h1>
      <p>This is the profile page content.</p>
    </div>
  );
};

export default Profile;
