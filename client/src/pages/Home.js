import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Logo.png";
import "../styles/Home.module.css";
import "../styles/global.css"

const Home = () => {
  return (
    <div>
      <div className="container">

        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>

          <div className="buttons">
            <div className="column">
              <Link to="/userlogin">
                <button>Login</button>
              </Link>
            </div>
            <div className="column center">
              <Link to="/userregister">
                <button>Register</button>
              </Link>
            </div>
            <div className="column">
              <Link to="/adminlogin">
                <button>Admin</button>
              </Link>
            </div>
          </div>
          
      </div>
    </div>
  );
};

export default Home;
