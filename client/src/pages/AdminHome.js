import React from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../Components/Navbars/AdminNav";
import styles from "../styles/AdminHome.module.scss";

const AdminHome = () => {
  return (
    <div className={styles["adminhome-container"]}>
      <header>
        <AdminNavbar />
      </header>

      <h1>Admin Home</h1>

      <div className={styles["adminhome-buttons"]}>

        <Link to="/globalfooditems">
          <button>CRUD</button>
        </Link>

        <Link to="/registeradmin">
          <button>Register Admins</button>
        </Link>

      </div>
    </div>
  );
};

export default AdminHome;
