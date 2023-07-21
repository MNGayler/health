import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GlobalAddItem = () => {
  let navigate = useNavigate();

  //Formik initil form values
  const initialValues = {
    food_name: "",
    energy: "",
    protien: "",
    fibre: "",
    image: "",
  };

  const validationSchema = Yup.object().shape({
    food_name: Yup.string().required().min(2).max(20),
    energy: Yup.number().required().typeError("Energy must be a number!"),
    protien: Yup.number().required().typeError("Protien must be a number!"),
    fibre: Yup.number().required().typeError("Fibre must be a number!"),
    image: Yup.string(),
  });

  //function that runs when the form is sent and redirects to global food items
  const onSubmit = (data) => {
    // Get the accessToken from sessionStorage
    const accessToken = sessionStorage.getItem("accessToken");

    // Set the headers for the request
    const headers = {
      accessToken: accessToken,
    };

    axios
      .post("http://localhost:6001/globalfooditems", data, { headers: headers })
      .then((response) => {
        if (response.data.error) {
          console.log("Error:", response.data.error);
        } else {
          navigate("/globalfooditems");
        }
      });
  };

  return (
    <div className="addItemContainer">
      This is add item global
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Item Name: </label>
          <ErrorMessage name="food_name" component="span" />
          <Field
            id="inputAddItem"
            name="food_name"
            placeholder="e.g. Apple"
            autoComplete="off"
          />
          <label>Energy (cals/100g): </label>
          <ErrorMessage name="energy" component="span" />
          <Field
            id="inputAddItem"
            name="energy"
            placeholder="e.g. 10"
            autoComplete="off"
          />
          <label>Protien (mg/100g): </label>
          <ErrorMessage name="protien" component="span" />
          <Field
            id="inputAddItem"
            name="protien"
            placeholder="e.g. 10"
            autoComplete="off"
          />
          <label>Fibre (mg/100g): </label>
          <ErrorMessage name="fibre" component="span" />
          <Field
            id="inputAddItem"
            name="fibre"
            placeholder="e.g. 10"
            autoComplete="off"
          />
          <label>Image: </label>
          <ErrorMessage name="image" component="span" />
          <Field
            id="inputAddItem"
            name="image"
            placeholder="path to image"
            autoComplete="off"
          />
          <button type="submit">Add Item</button>
        </Form>
      </Formik>
    </div>
  );
};

export default GlobalAddItem;
