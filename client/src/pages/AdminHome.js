import React from 'react'
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div>
      <h1>this is admin home</h1>

      <Link to="/globalfooditems">
        <button>CRUD</button>
      </Link>
      <Link to="/registeradmin">
        <button>register a admin</button>
      </Link>






    </div>
  )
}

export default AdminHome
