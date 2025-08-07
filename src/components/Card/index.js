import {
  FaStethoscope,
  FaStar,
  FaLocationDot,
  FaCircleDot,
} from "react-icons/fa6";

import {Link} from "react-router-dom";

import "./index.css";

const Card = (props) => {
  const { item } = props;
  const {
    id,
    name,
    patients_treated,
    profile_image,
    rating,
    specialization,
    distance_km,
    status,
  } = item;


  const renderStatus = () => {
    switch (status) {
      case "Available":
        return (
          <div className="card-cta">
            <div className="status-chip available">
              <FaCircleDot />
              <p className="status-text">{status}</p>
            </div>
            <Link to={`/profile/${id}`}>
            <button className="book-appointment-button">
              Book Appointment
            </button>
            </Link>
          </div>
        );
      case "Fully Booked":
        return (
          <div className="card-cta">
            <div className="status-chip unavailable">
              <FaCircleDot />
              <p className="status-text">{status}</p>
            </div>
          </div>
        );
      case "On Leave":
        return (
          <div className="card-cta">
            <div className="status-chip busy">
              <FaCircleDot />
              <p className="status-text">{status}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <li className="card">
      <div className="card-image-wrapper">
        <img
          className="card-image"
          src={profile_image}
          alt={`${name}'s profile`}
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <div className="specialization">
          <FaStethoscope />
          <p className="specialization-text">{specialization}</p>
          <div className="dot"></div>
          <div className="distance">
            <FaLocationDot className="location-icon" />
            <p>{distance_km}km</p>
          </div>
        </div>
        <div className="card-rating">
          <FaStar className="rating-icon" />
          <p className="rating-text">
            {rating}
            <span className="number"> ({patients_treated})</span>
          </p>
        </div>
        {renderStatus()}
      </div>
    </li>
  );
};

export default Card;
