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
    height: "",
    sex: "male",
    weight: "",
  };

  //validation schama to validate client form fields using yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(2).max(15).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(5).max(20).required(),
    height: Yup.number().required(),
    sex: Yup.string().required(),
    weight: Yup.number().required(),
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

          <h3>
            The following is required to track your weight, Body Mass Index,
            BMI, etc.
          </h3>

          <div>
            <label htmlFor="height">Height (in cm):</label>
            <Field type="number" id="height" name="height" required />
            <ErrorMessage name="height" component="span" />
          </div>

          <div>
            <label>Sex:</label>
            <Field type="radio" id="male" name="sex" value="male" />
            <label htmlFor="male">Male</label>
            <Field type="radio" id="female" name="sex" value="female" />
            <label htmlFor="female">Female</label>
            <ErrorMessage name="sex" component="span" />
          </div>

          <div>
            <label htmlFor="weight">Weight (in kg):</label>
            <Field type="number" id="weight" name="weight" required />
            <ErrorMessage name="weight" component="span" />
          </div>

          <button type="submit">Register</button>
        </Form>
      </Formik>
      If you already have an account? <Link to="/userlogin">login</Link>
    </div>
  );
};

export default UserRegister;
