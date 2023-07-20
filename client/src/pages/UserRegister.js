import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const UserRegister = () => {
  let navigate = useNavigate();

  //Formik initil form values
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  //validation schama to validate client form fields using yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(2).max(15).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(5).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:6001/auth", data).then(() => {
      console.log(data);
      navigate("/userlogin");
    });
  };

  return (
    <div>
      <h1>Register a user page</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label>Username: </label>
          <ErrorMessage name="username" component="span"></ErrorMessage>
          <Field name="username" placeholder="john123...." />
          <label>Email: </label>
          <ErrorMessage name="email" component="span"></ErrorMessage>
          <Field name="email" placeholder="you@yourmail.com" />
          <label>Password: </label>
          <ErrorMessage name="password" component="span"></ErrorMessage>
          <Field type="password" name="password" placeholder="your password" />

          <button type="submit">Register</button>
        </Form>
      
      </Formik>
      If you already have an account? <Link to="/userlogin">login</Link>
    </div>
  );
};

export default UserRegister;
