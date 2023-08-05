import React, {useState, useEffect} from "react";
import navLogo from "../../images/LogoWhiteonTransparent.png";
import { Link } from "react-router-dom";
import styles from "../../styles/AdminNav.module.scss";
import axios from "axios";

const AdminNav = () => {
    // Fetch userId from sessionStorage
    const adminId = sessionStorage.getItem("adminId");
    const [adminname, setAdminname] = useState("");

    useEffect(() => {
        const headers = { userId: adminId};
        const fetchAdminname = async () => {
            try {
                const response = await axios.get("http://localhost:6001/auth/name", {
                    headers,
                });
                const adminnameFetched = response.data.username;
                setAdminname(adminnameFetched);
            } catch(error) {
                console.error("Error fetching adminname:", error)
            }
        };
        fetchAdminname();
    }, [adminId]) 






  return (
    <div className={styles["adminnav-container"]}>
      <div className={styles["adminnav-logo"]}>
        <Link to="/adminhome">
          <img className={styles["adminnav-logo"]} src={navLogo} alt="logo" />
        </Link>
      </div>
      <div className={styles["adminnav-nameandlinkscontainer"]}>
        <div className={styles["adminnav-welcome"]}>
          <h3>welcome: {adminname}</h3>
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
