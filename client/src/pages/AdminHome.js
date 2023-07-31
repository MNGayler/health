import React from 'react'
import { Link } from "react-router-dom";
import AdminNav from '../Components/Navbars/AdminNav';

const AdminHome = () => {
  return (
    <div>
      <header>
        <AdminNav />
      </header>

      <h1>this is admin home</h1>

      <Link   to="/globalfooditems">
        <button>CRUD</button>
      </Link>
      <Link to="/registeradmin">
        <button>register a admin</button>
      </Link>






    </div>
  )
}

export default AdminHome
