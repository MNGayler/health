import React from 'react'
import { Link } from "react-router-dom";

const UserHome = () => {
  return (
    <div>
      <h1>This is user home</h1>
      <Link to="/userfooditems">
        <button>Food Items</button>
      </Link>
      <Link to="/userinfo">
        <button>Personal Info</button>
      </Link>

    </div>
  )
}

export default UserHome
