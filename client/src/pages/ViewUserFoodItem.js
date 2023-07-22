import { useEffect, useState } from "react";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div>
      <h1>individual user item</h1>

      <h2>{foodObject.food_name}</h2>
      <div className="global-image">
        <img src={getImageSource()} alt={foodObject.food_name} />
      </div>
      <div>food_name:{foodObject.food_name} </div>
      <div>Energy:{foodObject.energy} </div>
      <div>Protien:{foodObject.protien} </div>
      <div>Fibre:{foodObject.fibre} </div>
      <div>
        <Link to={`/userupdateitem/${id}`}>
          <button>Update</button>
        </Link>
        <button onClick={() => setShowConfirmation(true)}>Delete</button>
        <Link to="/usermyfooditems">
          <button>Back</button>
        </Link>
      </div>
      {showConfirmation && (
        <div>
          <p>Are you sure you want to delete this item?</p>
          <button onClick={() => handleConfirmation(true)}>Yes</button>
          <button onClick={() => handleConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default ViewUserFoodItem;
