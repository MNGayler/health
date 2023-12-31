import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AdminNavbar from "../Components/Navbars/AdminNav";
import styles from "../styles/RegisterAdmin.module.scss";

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
    <div className={styles["registeradmin-container"]}>
      <header>
        <AdminNavbar />
      </header>

      <h1 className={styles["registeradmin-title"]}>Register Admin</h1>
      <Link to="/adminhome">
        <button className={styles["registeradmin-back"]}>Back</button>
      </Link>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="registeradmin-fields">
            <div>
              <label>Username: </label>
              <Field
                className={styles["registeradmin-textbox"]}
                name="username"
                placeholder="john123...."
              />
              <ErrorMessage name="username" component="span"></ErrorMessage>
            </div>
            <div>
              <label>Email: </label>
              <Field
                className={styles["registeradmin-textbox"]}
                name="email"
                placeholder="you@yourmail.com"
              />
              <ErrorMessage name="email" component="span"></ErrorMessage>
            </div>
            <div>
              <label>Password: </label>
              <Field
                className={styles["registeradmin-textbox"]}
                type="password"
                name="password"
                placeholder="your password"
              />
              <ErrorMessage name="password" component="span"></ErrorMessage>
            </div>
          </div>
          <button className={styles["registeradmin-button"]} type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterAdmin;
