import Nav from "../Nav";
import Card from "../Card";
import "./index.css";
import { ClipLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { IoSearchOutline, IoThermometer } from "react-icons/io5";

const Home = () => {
  const apiStatusConstants = {
    initial: "INITIAL",
    inProgress: "IN_PROGRESS",
    success: "SUCCESS",
    failure: "FAILURE",
  };

  const [apiStatus, setApiStatus] = useState({
    status: apiStatusConstants.initial,
    data: [],
    searchInput:"",
  });

  useEffect(() => {
    const getAppointments = async () => {
      setApiStatus((prevState)=>({ ...prevState,status: apiStatusConstants.inProgress, data: null,  }));

      const response = await fetch("https://www.jsonkeeper.com/b/JJIOG");
      const data = await response.json();
      if (response.ok) {
        setApiStatus((prevState) => ({
          ...prevState,
          status: apiStatusConstants.success,
          data: data,
        }));
      } else {
        setApiStatus((prevState) => ({
          ...prevState,
          status: apiStatusConstants.failure,
          data: [],
        }));
      }};
    getAppointments();
  }, []);

  const renderLoadingView = () => {
    return (
      <div className="cards-section-loading">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  };

  const renderSuccessView = () => {
    const { data,searchInput } = apiStatus;
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.specialization.toLowerCase().includes(searchInput.toLowerCase())
      )
      
    return (
      <ul className="cards-section">
        {filteredData.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </ul>
    );
  };

  const renderCards = () => {
    const { status } = apiStatus;
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return <p>Failed to load data</p>;
      default:
        return null;
    }
  };

  const onChangeSearchInput = (event) => {
    setApiStatus((prevState) => ({
      ...prevState,
      searchInput: event.target.value,
    }));
  };

  return (
    <div>
      <Nav />
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-heading">Quality & expert health-care</h1>
            <a href="#booking"><button className="hero-button">Book an Appointment</button></a>
            
          </div>
          <div className="hero-image-wrapper">
            <img
              src="https://cdn.prod.website-files.com/687dfa6a74652a7bc2b6b2a5/689096d8bf4ef51d07e7c6c0_image%2019.png"
              alt="Hero"
              className="hero-image-mobile"
            />
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stats-wrapper">
            <div className="stat-item">
              <h2 className="stat-heading">100+</h2>
              <p className="stat-para">Doctors</p>
            </div>
            <div className="stat-item">
              <h2 className="stat-heading">500+</h2>
              <p className="stat-para">Patients</p>
            </div>
            <div className="stat-item">
              <h2 className="stat-heading">50+</h2>
              <p className="stat-para">Diseases</p>
            </div>
            <div className="image-wrapper">
              <img
                src="https://cdn.prod.website-files.com/687dfa6a74652a7bc2b6b2a5/689096d8bf4ef51d07e7c6c0_image%2019.png"
                alt="Hero"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="home-card-container" id='booking'>
        <div className="card-section-header">
          <h3 className="card-heading">All Doctors</h3>
          <div className="search-input-wrapper">
            <input
              type="search"
              placeholder="Search by name or specialty"
              className="search-input"
              value={apiStatus.searchInput}
              onChange={onChangeSearchInput}
            />
            <IoSearchOutline />
          </div>
        </div>
      </div>
      {renderCards()}
    </div>
  );
};

export default Home;
