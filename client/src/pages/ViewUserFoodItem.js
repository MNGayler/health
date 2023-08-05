import { useEffect, useState } from "react";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../Components/Navbars/UserNav";
import styles from "../styles/ViewUserFoodItem.module.scss";

import aubergineImage from "../images/aubergine.jpg";
import onionImage from "../images/onion.jpg";
import potatoImage from "../images/potato.jpg";
import tomatoImage from "../images/tomato.jpg";
import celeryImage from "../images/celery.jpg";
import courgetteImage from "../images/courgette.jpg";

//image mapping
const imageMapping = {
  onion: onionImage,
  potato: potatoImage,
  tomato: tomatoImage,
  celery: celeryImage,
  courgette: courgetteImage,
};

const ViewUserFoodItem = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [foodObject, setFoodObject] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:6001/userfooditems/byID/${id}`)
      .then((response) => {
        setFoodObject(response.data);
      });
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:6001/userfooditems/byId/${id}`)
      .then((response) => {
        // The item was successfully deleted
        console.log("Item deleted successfully");
        navigate("/usermyfooditems");
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
    return aubergineImage; // fallback image
  };

  return (
    <div className={styles["viewuserfooditem-container"]}>
    <header>
      <UserNavbar />
    </header>
      <h1>User Item</h1>

      <div className={styles["viewuserfooditem-itemcontainer"]}>
      <div>
        <img className={styles["viewuserfooditem-image"]} src={getImageSource()} alt={foodObject.food_name} />
      </div>
      <h2 className={styles["viewuserfooditem-title"]}>{foodObject.food_name}</h2>
      <div>Energy:{foodObject.energy} </div>
      <div>Protien:{foodObject.protien} </div>
      <div>Fibre:{foodObject.fibre} </div>
      <div>
        <Link to={`/userupdateitem/${id}`}>
          <button className={styles["viewuserfooditem-button"]}>Update</button>
        </Link>
        <button className={styles["viewuserfooditem-button"]} onClick={() => setShowConfirmation(true)}>Delete</button>
        <Link to="/usermyfooditems">
          <button className={styles["viewuserfooditem-button"]} >Back</button>
        </Link>
      </div>
      {showConfirmation && (
        <div>
          <p>Are you sure you want to delete this item?</p>
          <button className={styles["viewuserfooditem-buttondelete"]} onClick={() => handleConfirmation(true)}>Yes</button>
          <button className={styles["viewuserfooditem-button"]} onClick={() => handleConfirmation(false)}>No</button>
        </div>
      )}</div>
    </div>
  );
};

export default ViewUserFoodItem;
