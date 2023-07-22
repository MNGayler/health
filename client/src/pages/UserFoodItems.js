import React from "react";
import { Link } from "react-router-dom";

const UserFoodItems = () => {
  return (
    <div>
      <h1>Food items</h1>
      <div>
        <Link to="/userhome">
          <button>My Home</button>
        </Link>
        <p>Return back home</p>
      </div>
      <div>
        <Link to="/usermyfooditems">
          <button>My Items</button>
        </Link>
        <p>View, add, update and delete your personal food items</p>
      </div>
      <div>
        <Link to="/userallfooditems">
          <button>All Items</button>
        </Link>
        <p>View and consume all available items</p>
      </div>
      <div>
        <Link to="/viewconsumption">
          <button>Consumption</button>
        </Link>
        <p>View your consumption</p>
      </div>
    </div>
  );
};

export default UserFoodItems;
