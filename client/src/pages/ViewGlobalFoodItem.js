import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    // Delete logic goes here soon,.............
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
    <div>
      <h1>Veiwing item with id: {id}</h1>
      <h2>{foodObject.food_name}</h2>
      <div className="global-image">
        <img src={getImageSource()} alt={foodObject.food_name} />
      </div>
      <div>food_name:{foodObject.food_name} </div>
      <div>Energy:{foodObject.energy} </div>
      <div>Protien:{foodObject.protien} </div>
      <div>Fibre:{foodObject.fibre} </div>
      <div>
        <button>Update</button>
        <button onClick={() => setShowConfirmation(true)}>Delete</button>
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

export default ViewGlobalFoodItem;
