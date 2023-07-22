import { useEffect, useState } from "react";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
    <div>
      <Link to={`/viewglobalfooditem/${id}`}>
        <button>Back</button>
      </Link>
      <h1>update this item</h1>
      <div className="updateContainer">
        <div className="current">
          <h2>The item currently:</h2>
          <h2>{foodObject.food_name}</h2>
          <div>food_name:{foodObject.food_name} </div>
          <div>Energy:{foodObject.energy} </div>
          <div>Protien:{foodObject.protien} </div>
          <div>Fibre:{foodObject.fibre} </div>
        </div>
        <div className="new">
          <h1>You will change the item to the following:</h1>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className="formContainer">
              <label>Item Name: </label>
              <ErrorMessage name="food_name" component="span" />
              <Field id="inputAddItem" name="food_name" autoComplete="off" />
              <label>Energy (cals/100g): </label>
              <ErrorMessage name="energy" component="span" />
              <Field id="inputAddItem" name="energy" autoComplete="off" />
              <label>Protien (mg/100g): </label>
              <ErrorMessage name="protien" component="span" />
              <Field id="inputAddItem" name="protien" autoComplete="off" />
              <label>Fibre (mg/100g): </label>
              <ErrorMessage name="fibre" component="span" />
              <Field id="inputAddItem" name="fibre" autoComplete="off" />
              <label>Image: </label>
              <ErrorMessage name="image" component="span" />
              <Field id="inputAddItem" name="image" autoComplete="off" />
              <button type="submit">Update Item</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default GlogalUpdateItem;
