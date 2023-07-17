import React from 'react'
import { Link } from "react-router-dom";

const UserLogin = () => {
  return (
    <div>
      <h1>This is user login</h1>

      <Link to="/userhome">
        <button>skip login</button>
      </Link>
      <Link to="/userregister">
        <button>register</button>
      </Link>

    </div>
  )
}

export default UserLogin
