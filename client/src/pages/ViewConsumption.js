import React, { useState, useEffect } from "react";
import axios from "axios";

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

const determineCreator = (boolean) => {
  if (!boolean) return "USER";
  return "GLOBAL";
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
    <div>
      <h1>consumption record</h1>
      {listOfConsumption.map((value, index) => {
        // Format the date using the formatDate function above
        const formattedDate = formatDate(value.date);
        // Determine the creator of consumed item
        const creator = determineCreator(value.is_global);

        return (
          <div key={index} className="item">
            <div className="info">
              <div>
                Date: {formattedDate} Food: {value.food} weight: {value.weight}g
                creator: {creator}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewConsumption;
