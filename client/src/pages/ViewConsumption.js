import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import UserNavbar from "../Components/Navbars/UserNav";
import styles from "../styles/ViewConsumption.module.scss";

// Get the user ID from session storage so we can send it with requests
const userId = sessionStorage.getItem("userId");
const headers = { userId: userId };

// Function to format date in YYYY-MM-DD format
const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ViewConsumption = () => {
  const [listOfConsumption, setListOfConsumptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:6001/itemconsumption", { headers })
      .then((response) => {
        setListOfConsumptions(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div className={styles["viewconsumption-container"]}>
      <header>
        <UserNavbar />
      </header>

      <h1>Consumption History</h1>
      <Link to="/userfooditems">
        <button>Back</button>
      </Link>
      {listOfConsumption.length === 0 ? (
        <p>No consumption yet.</p>
      ) : (
        listOfConsumption.map((value, index) => {
          const formattedDate = formatDate(value.date);
          // Determine the creator of the consumed item based on the "type" property
          const creator = value.type === "global" ? "GLOBAL" : "USER";

          return (
            <div key={index} className="item">
              <div className="info">
                <div>
                  Date: {formattedDate} Food: {value.food} Weight:{value.weight}g Creator: {creator}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ViewConsumption;
