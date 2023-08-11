import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserNavbar from "../Components/Navbars/UserNav";
import styles from "../styles/UserAllItems.module.scss";

import aubergineImage from "../images/aubergine.jpg";
import onionImage from "../images/onion.jpg";
import potatoImage from "../images/potato.jpg";
import tomatoImage from "../images/tomato.jpg";
import celeryImage from "../images/celery.jpg";
import courgetteImage from "../images/courgette.jpg";
import bananaImage from "../images/banana.jpg";
import blueberryImage from "../images/blueberry.jpg";
import grapeImage from "../images/grape.jpg";

import orangeImage from "../images/orange.jpg";
import pearImage from "../images/pear.jpg";
import watermelonImage from "../images/watermelon.jpg";

//image mapping
const imageMapping = {
  onion: onionImage,
  potato: potatoImage,
  tomato: tomatoImage,
  celery: celeryImage,
  courgette: courgetteImage,
  banana: bananaImage,
  blueberry: blueberryImage,
  grape: grapeImage,
  orange: orangeImage,
  pear: pearImage,
  watermelon: watermelonImage,
};

// Get the user ID from session storage so we can send it with requests
const userId = sessionStorage.getItem("userId");
const headers = { userId: userId };

const UserAllFoodItems = () => {
  let navigate = useNavigate();
  const [listOfAllFoodItems, setListOfAllFoodItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:6001/userfooditems/all", { headers })
      .then((response) => {
        setListOfAllFoodItems(response.data);
        console.log(response.data);
      });
  }, []);

  const getImageSource = (image) => {
    if (image && imageMapping.hasOwnProperty(image)) {
      return imageMapping[image];
    }
    return aubergineImage; // fallback image
  };

  //navigate to the correct global or user item page when viewing a combination of both types
  const navigateToItem = (value) => {
    if (value.user) {
      // If the item has a "user" property, it's a user-specific item
      navigate(`/consumeuseritem/${value.id}`);
    } else {
      // Otherwise, it's a global item
      navigate(`/consumeglobalitem/${value.id}`);
    }
  };

  return (
    <div>
      <header>
        <UserNavbar />
      </header>

      <div className={styles["userallitems-container"]}>
        <h1>
          All Food items - select to consume!
        </h1>
        <Link to="/userfooditems">
          <button>Back</button>
        </Link>
        <div className={styles["userallitems-itemcontainer"]}>
          {listOfAllFoodItems.map((value, index) => {
            return (
              <div key={index} className="item">
                <div>
                  <img
                    className={styles["userallitems-image"]}
                    src={getImageSource(value.image)}
                    alt={value.food_name}
                  />
                </div>
                <div className="info">
                  <div>{value.food_name}</div>
                  <div className="buttons">
                    {/* navigates to view chosen item with info and options */}
                    <button onClick={() => navigateToItem(value)}>View</button>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Handle empty userItems scenario */}
          {listOfAllFoodItems.length === 0 && (
            <div>No items found for this user.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAllFoodItems;
