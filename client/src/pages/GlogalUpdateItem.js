import { useEffect, useState } from "react";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AdminNavbar from "../Components/Navbars/AdminNav";
import styles from "../styles/GlobalUpdateItem.module.scss";

const GlogalUpdateItem = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [foodObject, setFoodObject] = useState({});

  //Formik initil form values
  const initialValues = {
    food_name: foodObject.food_name,
    energy: foodObject.energy,
    protien: foodObject.protien,
    fibre: foodObject.fibre,
    image: foodObject.image,
  };

  const validationSchema = Yup.object().shape({
    food_name: Yup.string().required().min(2).max(20),
    energy: Yup.number().required().typeError("Energy must be a number!"),
    protien: Yup.number().required().typeError("Protien must be a number!"),
    fibre: Yup.number().required().typeError("Fibre must be a number!"),
    image: Yup.string(),
  });

  //gets the item by id
  useEffect(() => {
    axios
      .get(`http://localhost:6001/globalfooditems/byID/${id}`)
      .then((response) => {
        setFoodObject(response.data);
      });
  }, [id]);

  //function that runs when the form is sent, updating the item and redirecting to global food items
  const onSubmit = (data) => {
    axios
      .put(`http://localhost:6001/globalfooditems/byId/${id}`, data)
      .then((response) => {
        if (response.data.error) {
          console.log("Error:", response.data.error);
        } else {
          navigate("/globalfooditems");
        }
      });
  };

  return (
    <div className={styles["globalupdateitem-container"]}>
      <header>
        <AdminNavbar />
      </header>

      <h1 className={styles["globalupdateitem-title"]}>Update Item</h1>
      <Link to={`/viewglobalfooditem/${id}`}>
        <button className={styles["globalupdateitem-backbutton"]}>Back</button>
      </Link>

      <div className={styles["globalupdateitem-rightleftcontainer"]}>
        <div className={styles["globalupdateitem-left"]}>
          <h3>Current Values:</h3>
          <h2>{foodObject.food_name}</h2>

          <div>Energy:{foodObject.energy} </div>
          <div>Protien:{foodObject.protien} </div>
          <div>Fibre:{foodObject.fibre} </div>
          <div>Image:{foodObject.image} </div>
        </div>

        <div className={styles["globalupdateitem-right"]}>
          <h3>Changes:</h3>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className={styles["globalupdateitem-form"]}>
              <div className={styles["form-group"]}>
                <label>Item Name: </label>
                <ErrorMessage name="food_name" component="span" />
                <Field id="inputAddItem" name="food_name" autoComplete="off" />
              </div>
              <div className={styles["form-group"]}>
                <label>Energy (cals/100g): </label>
                <ErrorMessage name="energy" component="span" />
                <Field id="inputAddItem" name="energy" autoComplete="off" />
              </div>
              <div className={styles["form-group"]}>
                <label>Protien (mg/100g): </label>
                <ErrorMessage name="protien" component="span" />
                <Field id="inputAddItem" name="protien" autoComplete="off" />
              </div>
              <div className={styles["form-group"]}>
                <label>Fibre (mg/100g): </label>
                <ErrorMessage name="fibre" component="span" />
                <Field id="inputAddItem" name="fibre" autoComplete="off" />
              </div>
              <div className={styles["form-group"]}>
                <label>Image: </label>
                <ErrorMessage name="image" component="span" />
                <Field id="inputAddItem" name="image" autoComplete="off" />
              </div>
              <button className={styles["globalupdateitem-button"]} type="submit">Update Item</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default GlogalUpdateItem;
