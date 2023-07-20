import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
        sessionStorage.setItem("accessToken", response.data);
        navigate("/adminhome");
      });
  };

  return (
    <div>
      <h1>This is admin login</h1>
      <Link to="/adminhome">
        <button>skip login</button>
      </Link>
      <span>above to be removed</span>
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
    </div>
  );
};

export default AdminLogin;
