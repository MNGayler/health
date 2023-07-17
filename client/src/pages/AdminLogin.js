import React from "react";
import { Link } from "react-router-dom";


const AdminLogin = () => {
  return (
    <div>
      <h1>This is admin login</h1>
      <Link to="/adminhome">
        <button>skip login</button>
      </Link>
    </div>
  );
};

export default AdminLogin;
