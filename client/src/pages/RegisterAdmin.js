import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterAdmin = () => {
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
    axios.post("http://localhost:6001/authadmin", data).then(() => {
      console.log(data);
      navigate("/adminhome");
    });
  };

  return (
    <div>
      <h1>Register an admin page</h1>
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
      <span>change the route to admin then delete this</span>
    </div>
  );
};

export default RegisterAdmin;
