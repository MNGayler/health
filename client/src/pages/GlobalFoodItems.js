import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

const GlobalFoodItems = () => {
  let navigate = useNavigate();
  const [listOfGlobalFoodItems, setListOfGloabalFoodItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:6001/globalfooditems").then((response) => {
      setListOfGloabalFoodItems(response.data);
      console.log(response.data);
    });
  }, []);

  const getImageSource = (image) => {
    if (image && imageMapping.hasOwnProperty(image)) {
      return imageMapping[image];
    }
    return strawberryImage; // fallback image
  };

  return (
    <div>
      <h1>Global Items</h1>
      <Link to="/adminhome">
        <button>Home</button>
      </Link>
      <Link to="/globaladditem">
        <button>Add New Item</button>
      </Link>
      <div className="item-container">
        {listOfGlobalFoodItems.map((value, key) => {
          return (
            <div className="item">
              <div>
                <img src={getImageSource(value.image)} alt={value.food_name} />
              </div>
              <div className="info">
                <div>Food Name: {value.food_name}</div>
                <div className="buttons">
                  {/* navigates to view chosen item with info and options */}
                  <button
                    onClick={() => {
                      navigate(`/viewglobalfooditem/${value.id}`);
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GlobalFoodItems;
