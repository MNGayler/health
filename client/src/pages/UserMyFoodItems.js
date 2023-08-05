import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserNavbar from "../Components/Navbars/UserNav";
import styles from "../styles/UserMyItems.module.scss";

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

// Get the user ID from session storage so we can send it with requests
const userId = sessionStorage.getItem("userId");
const headers = { userId: userId };

const UserMyFoodItems = () => {
  let navigate = useNavigate();
  const [listOfUserFoodItems, setListOfUserFoodItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:6001/userfooditems", { headers })
      .then((response) => {
        setListOfUserFoodItems(response.data);
        console.log(response.data);
      });
  }, []);

  const getImageSource = (image) => {
    if (image && imageMapping.hasOwnProperty(image)) {
      return imageMapping[image];
    }
    return aubergineImage; // fallback image
  };

  return (
    <div>
      <header>
        <UserNavbar />
      </header>

      <div className={styles["usermyitems-container"]}>
        <h1 className={styles["usermyitems-title"]}>My food items</h1>

        <Link to="/userfooditems">
          <button>back</button>
        </Link>
        <div>
          <Link to="/useradditem">
            <button>Add New Item</button>
          </Link>
        </div>
        <h3>
          {" "}
          Select the item VIEW button for: NUTRITIONAL INFORMATION, to UPDATE or
          to DELETE
        </h3>

        <div className={styles["usermyitems-itemcontainer"]}>
          {listOfUserFoodItems.map((value, index) => {
            return (
              <div key={index}>
                <div>
                  <img
                    className={styles["usermyitems-image"]}
                    src={getImageSource(value.image)}
                    alt={value.food_name}
                  />
                </div>
                <div>
                  <div>Item: {value.food_name}</div>
                  <div>
                    {/* navigates to view chosen item with info and options */}
                    <button
                      className={styles["usermyitems-button"]}
                      onClick={() => {
                        navigate(`/viewuserfooditem/${value.id}`);
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

export default UserMyFoodItems;
