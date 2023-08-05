import React from "react";
import navLogo from "../../images/LogoWhiteonTransparent.png";
import { Link } from "react-router-dom";
import styles from "../../styles/AdminNav.module.scss";

const AdminNav = () => {
  return (
    <div className={styles["adminnav-container"]}>
      <div className={styles["adminnav-logo"]}>
        <Link to="/adminhome">
          <img className={styles["adminnav-logo"]} src={navLogo} alt="logo" />
        </Link>
      </div>
      <div className={styles["adminnav-nameandlinkscontainer"]}>
        <div className={styles["adminnav-welcome"]}>
          <h3>welcome: dave</h3>
        </div>
        <div className={styles["adminnav-navlinks"]}>
          <Link className={styles["adminnav-navlinks"]} to="/adminhome">
            Home
          </Link>
          <Link className={styles["adminnav-navlinks"]} to="/globalfooditems">
            CRUD
          </Link>
          <Link className={styles["adminnav-navlinks"]} to="/registeradmin">
            Add_Admins
          </Link>
          <Link className={styles["adminnav-navlinks"]} to="/adminlogout">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
