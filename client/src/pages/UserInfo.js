import React, { useState, useEffect } from "react";
import axios from "axios";

const userId = sessionStorage.getItem("userId");
const headers = { userId: userId };

const UserInfo = () => {
  const [userWeight, setUserWeight] = useState(0);
  const [recentWeight, setRecentWeight] = useState(0);
  const [currentBMI, setCurrentBMI] = useState(0);
  const [currentAge,setCurrentAge] = useState(0);  
  const [dailyCalories, setDailyCalories] = useState(0);
  const [recentDate, setRecentDate] = useState("")

  // Function to format date in YYYY-MM-DD format
const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

  useEffect(() => {
    // Make the GET request to fetch the user information from the server
    axios.get("http://localhost:6001/weight/recent", {headers}) 
      .then((response) => {
        const { recentWeight, date, BMI, RMR, age } = response.data;
        // Update the state variables with the received data
        setRecentWeight(recentWeight);
        setRecentDate(date)
        setCurrentBMI(BMI);
        setDailyCalories(RMR);
        setCurrentAge(age);

      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("New weight: ", userWeight);
  };

  const formattedDate = formatDate(recentDate)

  return (
    <div>
      <h1>User Information</h1>
      <div className="container">
        <div className="top-div">
          <h3>Current information</h3>
          <p>Last update: {formattedDate} </p>
          <p>Your most recent weight: {recentWeight} kg</p>
          <p>Your current BMI is : {currentBMI} </p>
          <p>A rest you will burn approximately: {dailyCalories} calories per day</p>
        </div>
        <div className="bottom-div">
          <h3>Update your weight</h3>
          <form onSubmit={handleSubmit}>
            <label>
              New Weight:
              <input
                type="number"
                onChange={(e) => setUserWeight(e.target.value)}
              /> kg
            </label>
            <button type="submit">Submit</button>
          </form>
          <h3>Update your Age</h3>
          <p>Your age is set to {currentAge} years</p>
          <form onSubmit={handleSubmit}>
            <label>
              New Age:
              <input
                type="number"
                onChange={(e) => setUserWeight(e.target.value)}
              /> years
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
