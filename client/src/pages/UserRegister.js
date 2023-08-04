import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/UserRegister.module.scss";
import Logo from "../images/Logo.png";

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
    age: "",
  };

  //validation schama to validate client form fields using yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(2).max(15).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(5).max(20).required(),
    height: Yup.number().required().min(0.5).max(3),
    sex: Yup.string().required(),
    weight: Yup.number().required().min(40).max(300),
    age: Yup.number().integer().required().min(13).max(110),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:6001/auth", data).then(() => {
      console.log(data);
      navigate("/userlogin");
    });
  };

  return (
    <div className={styles["userregister-container"]}>
      <div className={styles["userregister-logo"]}>
        <img src={Logo} alt="logo" />
      </div>
      <h3>User Registration</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label>Username: </label>
          <ErrorMessage name="username" component="span"></ErrorMessage>
          <Field className={styles["userregister-textbox"]} name="username" placeholder="john123...." />

          <label>Email: </label>
          <ErrorMessage name="email" component="span"></ErrorMessage>
          <Field className={styles["userregister-textbox"]} name="email" placeholder="you@yourmail.com" />
          <label>Password: </label>
          <ErrorMessage name="password" component="span"></ErrorMessage>
          <Field className={styles["userregister-textbox"]} type="password" name="password" placeholder="your password" />

          

          <fieldset>
          <legend>Personal info for tracking</legend>
          <div>
            <label htmlFor="height">Height (in m):</label>
            <Field
              className={styles["userregister-textbox"]}
              type="number"
              id="height"
              name="height"
              required
              placeholder="1.7"
            />
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
            <Field  className={styles["userregister-textbox"]} type="number" id="weight" name="weight" required />
            <ErrorMessage name="weight" component="span" />
          </div>

          <div>
            <label htmlFor="age">Age: </label>
            <Field className={styles["userregister-textbox"]} type="number" id="age" name="age" required />
            <ErrorMessage name="age" component="span" />
          </div>
          </fieldset>

          <button className={styles["userregister-button"]} type="submit">Register</button>
        </Form>
      </Formik>
      If you already have an account? <Link to="/userlogin">login</Link>
    </div>
  );
};

export default UserRegister;
