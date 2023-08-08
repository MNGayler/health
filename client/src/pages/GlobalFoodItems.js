import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/GlobalFoodItems.module.scss";
import AdminNav from "../Components/Navbars/AdminNav";

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
    <div className={styles["globalfooditems-container"]}>
      <header>
        <AdminNav />
      </header>

      <div >
        <h1 className={styles["globalfooditems-title"]}>Global Items</h1>

        <Link to="/adminhome">
          <button>Back</button>
        </Link>

        <div>
          <Link to="/globaladditem">
            <button>Add New Item</button>
          </Link>
        </div>

        

        <div className={styles["globalfooditems-itemcontainer"]}>
          {listOfGlobalFoodItems.map((value, key) => {
            return (
              <div key={key}>
                <div>
                  <img
                    className={styles["globalfooditems-image"]}
                    src={getImageSource(value.image)}
                    alt={value.food_name}
                  />
                </div>
                <div >
                  <div>{value.food_name}</div>
                  <div >
                    {/* navigates to view chosen item with info and options */}
                    <button
                      className={styles["globalfooditems-button"]}
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
    </div>
  );
};

export default GlobalFoodItems;
