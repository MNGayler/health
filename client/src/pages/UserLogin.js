import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../styles/UserLogin.module.css";
import Logo from "../images/Logo.png";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const login = () => {
    const data = { email: email, password: password };
    axios.post("http://localhost:6001/auth/login", data).then((response) => {
      if (response.data.error) return alert(response.data.error);

      // Get the accessToken from the response.data
      const accessToken = response.data;
      sessionStorage.setItem("accessToken", response.data);

      // Decode the JWT to get the user ID and store it in session storage
      const decodedToken = jwt_decode(accessToken);
      const userId = decodedToken.id; // Get the user ID from the decoded JWT
      sessionStorage.setItem("userId", userId);

      navigate("/userhome");
    });
  };

  return (
    <div className="container">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <h1>User login</h1>

            
      <p>email</p>
      <input
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <p>password</p>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login}>login</button>
      <p>No account? <Link to="/userregister">register</Link> </p>
    </div>
  );
};

export default UserLogin;
