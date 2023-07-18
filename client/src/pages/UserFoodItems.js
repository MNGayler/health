import React from 'react'
import { Link } from "react-router-dom";

const UserFoodItems = () => {
  return (
    <div>
      This is user food items
      <Link to="/usermyfooditems">
        <button>My Items</button>
      </Link>
      <Link to="/userallfooditems">
        <button>All Items</button>
      </Link>
    </div>
  )
}

export default UserFoodItems
