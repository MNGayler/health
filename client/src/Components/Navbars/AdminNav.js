import React from 'react'
import navLogo from "../../images/LogoWhiteonTransparent.png"
import { Link } from 'react-router-dom'
import "../../styles/navbar.module.css"

const AdminNav = () => {
  return (
    <div className='navContainer'>
        <div className='navLogo'>
            <img src={navLogo} alt="logo" />
        </div>
        <div className='nameAndLinksContainer'>
            <div className='welcome'>
                <p>welcome: dave</p>
            </div>
            <div className='links'>
                <Link className="navLink"  to="/">Home</Link>
                <Link className="navLink" to="/">CRUD</Link>
                <Link className="navLink" to="/">Add_Admins</Link>
                <Link className="navLink" to="/">Logout</Link>
            </div>
        </div>
      
    </div>
  )
}

export default AdminNav

