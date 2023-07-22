import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>this is home - the landing page!</h1>
      <Link to="/userlogin">
        <button>User login</button>
      </Link>
      <Link to="/userregister">
        <button>Register</button>
      </Link>
      <Link to="/adminlogin">
        <button>Admin login</button>
      </Link>
      
    </div>
  )
}

export default Home
