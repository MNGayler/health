import React from "react";
import { Link } from "react-router-dom";
import UserNavbar from "../Components/Navbars/UserNav";
import styles from "../styles/UserFoodItems.module.scss";

const UserFoodItems = () => {
  return (
    <div className={styles["userfooditems-container"]}>
      <header>
        <UserNavbar />
      </header>

      <h1>Food Items</h1>

      <div className={styles["userfooditems-buttons"]}>
        <div>
          <Link to="/userhome">
            <button>User Home</button>
          </Link>
          
        </div>
        <div>
          <Link to="/usermyfooditems">
            <button>My Items</button>
          </Link>
          
        </div>
        <div>
          <Link to="/userallfooditems">
            <button>Consume Items</button>
          </Link>
          
        </div>
        <div>
          <Link to="/viewconsumption">
            <button>Consumption History</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default UserFoodItems;
