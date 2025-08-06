import './index.css'
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const Nav = () => {
  return (
    <nav className='nav'>
      <div className='nav-content'>
        <Link to="/">
      <img
        src="https://media.licdn.com/dms/image/v2/D4D0BAQGiaARpIEJqwQ/company-logo_200_200/B4DZZth6opH4AQ-/0/1745594330131/niroggyan_logo?e=1756944000&v=beta&t=A6FPAsUc4WIKj3xCzVeSBJCYG5ichI4KQf0dp2e5eEc"
        alt="Nirog Gyan Logo"
        className="logo"
      />
      </Link>
      <HashLink to="/#booking"><button className='nav-button'>Get Started</button></HashLink>
      
      </div>
    </nav>
  );
};

export default Nav;
