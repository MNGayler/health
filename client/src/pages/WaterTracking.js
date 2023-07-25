import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const WaterTracking = () => {
  // Fetch userId from sessionStorage
  const userId = sessionStorage.getItem("userId");

  const [todaysIntake, setTodaysIntake] = useState(0);
  const [newIntake, setNewIntake] = useState(0);

  useEffect(() => {
    const headers = { userId: userId };

    // Make the API request to fetch today's water consumption
    axios
      .get("http://localhost:6001/water", { headers })
      .then((response) => {
        const todaysIntake = response.data.todaysIntake;
        setTodaysIntake(todaysIntake);
      })
      .catch((error) => {
        console.error("Error fetching today's water consumption:", error);
      });
  }, [userId]);

  const handleStandardSubmit = (event) => {
    event.preventDefault();

    // Convert newIntake to a number
    const intakeValue = parseFloat(newIntake);

    //There is no intake for today registered
    if (!todaysIntake) {
      const data = {
        user: userId,
        date: new Date(),
        intake: intakeValue,
      };

      console.log(data);

      axios.post("http://localhost:6001/water", data).then((response) => {
        if (response.data.error) {
          console.log("Error:", response.data.error);
        } else {
          setTodaysIntake(newIntake);
          console.log("New Intake: ", newIntake);
        }
      });
      // there is an intake already recorded for today
    } else {
      const data = {
        userId: userId,
        intake: intakeValue,
      };
      console.log(data);

      axios
        .put("http://localhost:6001/water", data)
        .then((response) => {
          console.log("Water intake updated successfully!");
          setTodaysIntake(parseFloat(todaysIntake) + intakeValue);
          console.log("Today's total: ", todaysIntake);
        })
        .catch((error) => {
          console.error("Error updating water intake:", error);
        });
      
    }
  };

  const handleRapidSubmit = (event) => {
    event.preventDefault();

    //There is no intake for today registered
    if (!todaysIntake) {
      const data = {
        userId: userId,
        date: new Date(),
        intake: 250,
      };
      console.log(data);

      axios.post("http://localhost:6001/water", data).then((response) => {
        if (response.data.error) {
          console.log("Error:", response.data.error);
        } else {
          setTodaysIntake(newIntake);
          console.log("New Intake: ", 250);
        }
      });
      // there is an intake already recorded for today
    } else {
      const data = {
        userId: userId,
        intake: 250,
      };

      axios
        .put("http://localhost:6001/water", data)
        .then((response) => {
          console.log("Water intake updated successfully!");
          setTodaysIntake(todaysIntake + 250);
          console.log("Today's total: ", todaysIntake);
        })
        .catch((error) => {
          console.error("Error updating water intake:", error);
        });
      
    }
  };



  return (
    <div>
      <h1> water tracking</h1>
      <Link to="/userhome">
        <button>Back</button>
      </Link>

      <div>
        <h3>Today's Water Consumption</h3>
        <p>{todaysIntake} ml</p>
      </div>

      <div>
        <form onSubmit={handleRapidSubmit}>
          Quick add one glass (250ml): <button type="submit">Quick Add</button>
        </form>
      </div>
      <div>
        <form onSubmit={handleStandardSubmit}>
          Add: <input type="text" value={newIntake}
                onChange={(e) => setNewIntake(e.target.value)}/>
          ml of water <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default WaterTracking;
