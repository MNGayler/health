import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserNavbar from "../Components/Navbars/UserNav";
import styles from "../styles/UserInfo.module.scss";

const userId = sessionStorage.getItem("userId");
const headers = { userId: userId };

const UserInfo = () => {
  const [userWeight, setUserWeight] = useState(0);
  const [recentWeight, setRecentWeight] = useState(0);
  const [currentBMI, setCurrentBMI] = useState(0);
  const [currentAge, setCurrentAge] = useState(0);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [recentDate, setRecentDate] = useState("");
  //age seen by user
  const [initialAge, setInitialAge] = useState(0);
  // current field id - pk of the table
  const [currentId, setCurrentId] = useState(null);
  const [userHeight, setUserHeight] = useState(0);
  const [userSex, setUserSex] = useState(true);
  //loading state for proper page rendering
  const [loading, setLoading] = useState(true);

  // BMI calculation
  const calculateBMI = () => {
    return recentWeight / (userHeight * userHeight);
  };

  // basal metabolic rate
  const calculateRMR = () => {
    //user is male
    if (userSex)
      return (
        88.362 +
        13.397 * recentWeight +
        4.799 * userHeight * 100 -
        5.677 * currentAge
      );
    // female
    return (
      447.593 +
      9.247 * recentWeight +
      3.098 * userHeight * 100 -
      4.33 * currentAge
    );
  };

  // Function to format date in YYYY-MM-DD format
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //For height and sex
  useEffect(() => {
    axios
      .get("http://localhost:6001/weight/height", { headers })
      .then((response) => {
        const { height, sex } = response.data;
        //update the state variables
        setUserHeight(height);
        setUserSex(sex);
      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
      });
  }, []);

  //For weight tracking including age
  useEffect(() => {
    // Make the GET request to fetch the user information from the server
    axios
      .get("http://localhost:6001/weight/recent", { headers })
      .then((response) => {
        const { recentWeight, date, BMI, RMR, age, id } = response.data;
        // Update the state variables with the received data
        setRecentWeight(recentWeight);
        setUserWeight(recentWeight);
        setRecentDate(date);
        setCurrentBMI(BMI);
        setDailyCalories(RMR);
        setCurrentAge(age);
        setCurrentId(id);
        setInitialAge(age);
        // Set loading to false when data is fetched
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
        // Set loading to false
        setLoading(false);
      });
  }, []);

  // Function to handle weight submission
  const handleWeightSubmit = (event) => {
    event.preventDefault();

    const data = {
      user: userId,
      date: new Date(),
      weight: userWeight,
      BMI: 0,
      RMR: 0,
      age: currentAge,
    };

    // Calculate BMI and RMR based on the new weight
    const updatedBMI = calculateBMI(userWeight);
    const updatedRMR = calculateRMR(userWeight);

    // Update the data object with the calculated BMI and RMR
    data.BMI = updatedBMI;
    data.RMR = updatedRMR;

    axios.post("http://localhost:6001/weight", data).then((response) => {
      if (response.data.error) {
        console.log("Error:", response.data.error);
      } else {
        setRecentWeight(userWeight);
        console.log("New weight: ", userWeight);
      }
    });
  };

  // Function to handle age submission
  const handleAgeSubmit = (event) => {
    event.preventDefault();

    const data = {
      id: currentId,
      age: currentAge,
    };

    axios
      .put("http://localhost:6001/weight", data)
      .then((response) => {
        console.log("Age updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating age:", error);
      });
    console.log("New age: ", currentAge);
    setInitialAge(currentAge);
  };

  // Display a loading message while data is fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  
  const formattedDate = formatDate(recentDate);

  return (
    <div className={styles["userinfo-container"]}>
      <header>
        <UserNavbar />
      </header>

      <h1>User Information</h1>
      <Link to="/userhome">
        <button className={styles["userinfo-button"]}>Home</button>
      </Link>
      <div className="container">
        <div className="top-div">
          <h3>Current information</h3>
          <p>Last update: {formattedDate} </p>
          <p>Your most recent weight: {recentWeight} kg</p>
          {/* <p>Your current BMI is : {currentBMI} </p>
          <p>
            At rest you will burn approximately(Basal metabolic rate):{" "}
            {dailyCalories} calories per day
          </p> */}
        </div>
        <div className="bottom-div">
          <h3>Update your weight</h3>
          <form onSubmit={handleWeightSubmit}>
            <label>
              New Weight:
              <input
                type="number"
                value={userWeight}
                onChange={(e) => setUserWeight(e.target.value)}
              />
              kg
            </label>
            <button className={styles["userinfo-button"]} type="submit">
              Submit
            </button>
          </form>
          <h3>Update your Age</h3>
          <p>Your age is set to {initialAge} years</p>
          <form onSubmit={handleAgeSubmit}>
            <label>
              New Age:
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
              />
              years
            </label>
            <button className={styles["userinfo-button"]} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
