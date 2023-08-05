import { useEffect, useState } from "react";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios"
import AdminNav from "../Components/Navbars/AdminNav";
import styles from '../styles/ViewGlobalFoodItem.module.scss'

import bananaImage from "../images/banana.jpg";
import blueberryImage from "../images/blueberry.jpg";
import grapeImage from "../images/grape.jpg";
import strawberryImage from "../images/strawberry.jpg";
import orangeImage from "../images/orange.jpg";
import pearImage from "../images/pear.jpg";
import watermelonImage from "../images/watermelon.jpg";

//image mapping
const imageMapping = {
  banana: bananaImage,
  blueberry: blueberryImage,
  grape: grapeImage,
  orange: orangeImage,
  pear: pearImage,
  watermelon: watermelonImage,
};

const ViewGlobalFoodItem = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [foodObject, setFoodObject] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:6001/globalfooditems/byID/${id}`)
      .then((response) => {
        setFoodObject(response.data);
      });
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:6001/globalfooditems/byId/${id}`)
      .then((response) => {
        // The item was successfully deleted
        console.log("Item deleted successfully");
        navigate("/globalfooditems");
      })
      .catch((error) => {
        // Handle errors if the deletion fails
        console.error("Error deleting item:", error);
      });
  };

  const handleConfirmation = (confirm) => {
    if (confirm) {
      handleDelete();
    }
    setShowConfirmation(false);
  };

  const getImageSource = () => {
    if (foodObject.image && imageMapping.hasOwnProperty(foodObject.image)) {
      return imageMapping[foodObject.image];
    }
    return strawberryImage; // fallback image
  };

  return (
    <div className={styles["viewglobalfooditem-container"]}>
      <header>
        <AdminNav />
      </header>
      <h1>Global Item</h1>
      
      <div className="global-image">
        <img className={styles["viewglobalfooditem-image"]} src={getImageSource()} alt={foodObject.food_name} />
      </div>
      <h2>{foodObject.food_name}</h2>
      <div>Energy:{foodObject.energy} </div>
      <div>Protien:{foodObject.protien} </div>
      <div>Fibre:{foodObject.fibre} </div>
      <div>
        <Link to={`/globalupdateitem/${id}`}>
          <button className={styles["viewglobalfooditem-button"]} >Update</button>
        </Link>

        <button className={styles["viewglobalfooditem-button"]} onClick={() => setShowConfirmation(true)}>Delete</button>
        <Link to="/globalfooditems">
          <button className={styles["viewglobalfooditem-button"]}>Back</button>
        </Link>
      </div>
      {showConfirmation && (
        <div>
          <p>Are you sure you want to delete this item?</p>
          <button className={styles["viewglobalfooditem-buttondelete"]} onClick={() => handleConfirmation(true)}>Yes</button>
          <button className={styles["viewglobalfooditem-button"]} onClick={() => handleConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default ViewGlobalFoodItem;
