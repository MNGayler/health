import React from 'react'
import { Link } from "react-router-dom";
import AdminNavbar from '../Components/Navbars/AdminNav';
import styles from '../styles/AdminHome.module.scss'


const AdminHome = () => {
  return (
    <div>
      <header>
        <AdminNavbar />
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
