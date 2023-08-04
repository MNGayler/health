import React, { useEffect, useState } from "react";
import navLogo from "../../images/LogoWhiteonTransparent.png";
import { Link } from "react-router-dom";
import styles from "../../styles/UserNav.module.scss";
import axios from "axios";

const UserNav = () => {
  // Fetch userId from sessionStorage
  const userId = sessionStorage.getItem("userId");

  const [username, setUsername] = useState("");

  useEffect(() => {
    const headers = { userId: userId };
    const fetchUsername = async () => {
      try {
        const response = await axios.get("http://localhost:6001/auth/name", {
          headers,
        });
        const usernameFetched = response.data.username;
        setUsername(usernameFetched);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUsername();
  }, [userId]);
  return (
    <div className={styles["usernav-container"]}>
      <div className={styles["usernav-logo"]}>
        <img src={navLogo} alt="logo" />
      </div>
      <div className={styles["usernav-nameandlinkscontainer"]}>
        <div className={styles["usernav-welcome"]}>
          <h3>Welcome: {username}</h3>
        </div>
        <div className={styles["usernav-userlinks"]}>
          <Link className={styles["usernav-navlink"]} to="/">
            Home
          </Link>
          <Link className={styles["usernav-navlink"]} to="/userfooditems">
            Food
          </Link>
          <Link className={styles["usernav-navlink"]} to="/watertracking">
            Water
          </Link>
          <Link className={styles["usernav-navlink"]} to="/userinfo">
            Personal
          </Link>
          <Link className={styles["usernav-navlink"]} to="/charts">
            Charts
          </Link>
          <Link className={styles["usernav-navlink"]} to="/">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserNav;
