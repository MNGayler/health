import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Logo.png";
import styles from "../styles/Home.module.scss";

const Home = () => {
  return (
    <div className={styles["home-container"]}>
      <div className={styles["home-logo"]}>
        <img src={Logo} alt="logo" />
      </div>

      <div className={styles["home-buttons"]}>
        <div className={styles["home-button"]}>
          <Link to="/userlogin">
            <button>Login</button>
          </Link>
        </div>
        <div className={styles["home-button"]}>
          <Link to="/userregister">
            <button>Register</button>
          </Link>
        </div>
        <div className={styles["home-button"]}>
          <Link to="/adminlogin">
            <button>Admin</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
