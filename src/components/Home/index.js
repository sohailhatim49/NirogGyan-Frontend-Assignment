import Nav from "../Nav";
import Card from "../Card";
import "./index.css";

const Home = () => {
  return (
    <div>
      <Nav />
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-heading">Quality & expert health-care</h1>
            <button className="hero-button">Book an Appointment</button>
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
      <Card />
    </div>
  );
};

export default Home;
