import { useEffect, useState } from "react";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UserNavbar from "../Components/Navbars/UserNav";
import styles from "../styles/UserUpdateItem.module.scss";

const UserUpdateItem = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [foodObject, setFoodObject] = useState({});

  //Formik initil form values
  const initialValues = {
    user: foodObject.user,
    food_name: foodObject.food_name,
    energy: foodObject.energy,
    protien: foodObject.protien,
    fibre: foodObject.fibre,
    image: foodObject.image,
  };

  // Defines a Yup validation schema for a food item form.
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
      .get(`http://localhost:6001/userfooditems/byID/${id}`)
      .then((response) => {
        setFoodObject(response.data);
      });
  }, [id]);

  //function that runs when the form is sent, updating the item and redirecting to user my food items
  const onSubmit = (data) => {
    axios
      .put(`http://localhost:6001/userfooditems/byId/${id}`, data)
      .then((response) => {
        if (response.data.error) {
          console.log("Error:", response.data.error);
        } else {
          navigate("/usermyfooditems");
        }
      });
  };

  return (
    <div className={styles["userupdateitem-container"]}>
      <header>
        <UserNavbar />
      </header>

      <h1 className={styles["userupdateitem-title"]} >Update Item</h1>
      <Link to={`/viewuserfooditem/${id}`}>
        <button className={styles["userupdateitem-backbutton"]}>Back</button>
      </Link>

      <div className={styles["userupdateitem-rightleftcontainer"]}>
        <div className={styles["userupdateitem-left"]}>
          <h3>Current Values:</h3>
          <h2>{foodObject.food_name}</h2>

          <div>Energy:{foodObject.energy} </div>
          <div>Protien:{foodObject.protien} </div>
          <div>Fibre:{foodObject.fibre} </div>
          <div>Image:{foodObject.image} </div>
        </div>

        <div className={styles["userupdateitem-right"]}>
          <h3>Changes:</h3>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form className={styles["userupdateitem-form"]}>
                <div className={styles["form-group"]}>
                  <label htmlFor="food_name">Item Name:</label>
                  <ErrorMessage name="food_name" component="span" />
                  <Field
                    id="food_name"
                    name="food_name"
                    autoComplete="off"
                    className={
                      errors.food_name && touched.food_name ? "error" : ""
                    }
                  />
                </div>
                <div className={styles["form-group"]}>
                  <label htmlFor="energy">Energy (cals/100g):</label>
                  <ErrorMessage name="energy" component="span" />
                  <Field
                    id="energy"
                    name="energy"
                    autoComplete="off"
                    className={errors.energy && touched.energy ? "error" : ""}
                  />
                </div>
                <div className={styles["form-group"]}>
                  <label htmlFor="protien">Protien (mg/100g):</label>
                  <ErrorMessage name="protien" component="span" />
                  <Field
                    id="protien"
                    name="protien"
                    autoComplete="off"
                    className={errors.protien && touched.protien ? "error" : ""}
                  />
                </div>
                <div className={styles["form-group"]}>
                  <label htmlFor="fibre">Fibre (mg/100g):</label>
                  <ErrorMessage name="fibre" component="span" />
                  <Field
                    id="fibre"
                    name="fibre"
                    autoComplete="off"
                    className={errors.fibre && touched.fibre ? "error" : ""}
                  />
                </div>
                <div className={styles["form-group"]}>
                  <label htmlFor="image">Image:</label>
                  <ErrorMessage name="image" component="span" />
                  <Field
                    id="image"
                    name="image"
                    autoComplete="off"
                    className={errors.image && touched.image ? "error" : ""}
                  />
                </div>
                <button
                  className={styles["userupdateitem-button"]}
                  type="submit"
                >
                  Update Item
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateItem;
