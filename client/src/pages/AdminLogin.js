import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import styles from "../styles/AdminLogin.module.scss";
import Logo from "../images/Logo.png";

const AdminLogin = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = { email: email, password: password };
    axios
      .post("http://localhost:6001/authadmin/login", data)
      .then((response) => {
        if (response.data.error) return alert(response.data.error);

        // Get the accessToken from the response.data
        const accessToken = response.data;
        sessionStorage.setItem("accessToken", response.data);

        // Decode the JWT to get the user ID and store it in session storage
        const decodedToken = jwt_decode(accessToken);
        // Get the user ID from the decoded JWT
        const userId = decodedToken.id;
        sessionStorage.setItem("adminId", userId);

        navigate("/adminhome");
      });
  };

  return (
    <div className={styles["adminlogin-container"]}>
      <div className={styles["adminlogin-logo"]}>
        <img src={Logo} alt="logo" />
      </div>
      <h2>Admin Login</h2>

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
      <button className={styles["adminlogin-button"]} onClick={login}>
        login
      </button>
      <p>
        Not admin? <Link to="/">Return</Link>
      </p>
    </div>
  );
};

export default AdminLogin;
