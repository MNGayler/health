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
        intake: intakeValue,
      };

      axios.post("http://localhost:6001/water", data).then((response) => {
        if (response.data.error) {
          console.log("Error:", response.data.error);
        } else {
          setTodaysIntake(intakeValue);
          console.log("New Intake: ", intakeValue);
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
          console.log("Today's total: ", parseFloat(todaysIntake) + intakeValue);
        })
        .catch((error) => {
          console.error("Error updating water intake:", error);
        });
      
    }
  };

  const handleRapidSubmit = (event) => {
    event.preventDefault();

    
  
     //There is no intake for today registered create a data with id and 250ml water
    if (!todaysIntake) {

      const data = {
        user: userId,
        intake: 250,
      };
  
      axios
        .post("http://localhost:6001/water", data)
        .then((response) => {
          setTodaysIntake(parseFloat(250));
          console.log("New Intake: ", 250);
        })
        .catch((error) => {
          console.error("Error adding water intake:", error);
        });
    } else {
      // If there is already a record, update the intake value with 250 ml
      const data = {
        userId: userId,
        intake: 250,
      };
  
      axios
        .put("http://localhost:6001/water", data)
        .then((response) => {
          console.log("Water intake updated successfully!");
          setTodaysIntake(parseFloat(todaysIntake) + 250);
          console.log("Today's total: ", parseFloat(todaysIntake) + 250);
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
