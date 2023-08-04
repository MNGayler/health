import React from "react";
import { Link } from "react-router-dom";
import UserNavbar from "../Components/Navbars/UserNav";
import styles from "../styles/UserHome.module.scss";

const UserHome = () => {
  return (
    <div className={styles["userhome-container"]}>
      <header>
        <UserNavbar />
      </header>

      <h1>User Home</h1>

      <div className={styles["userhome-buttons"]}>
        <Link to="/userfooditems">
          <button>Food Items</button>
        </Link>
        <Link to="/userinfo">
          <button>Personal Info</button>
        </Link>
        <Link to="/watertracking">
          <button>Water Tacking</button>
        </Link>
        <Link to="/charts">
          <button>Progress charts</button>
        </Link>
      </div>

    </div>
  );
};

export default UserHome;
