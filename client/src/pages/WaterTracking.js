import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const WaterTracking = () => {

  const [todaysIntake, setTodaysIntake] = useState(0);

  useEffect(() => {
    // Fetch userId from sessionStorage
    const userId = sessionStorage.getItem('userId');
    const headers = { userId: userId };

    // Make the API request to fetch today's water consumption
    axios.get('http://localhost:6001/water', { headers })
      .then(response => {
        const todaysIntake = response.data.todaysIntake;
        setTodaysIntake(todaysIntake);
      })
      .catch(error => {
        console.error('Error fetching today\'s water consumption:', error);
      });
  }, []);









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
        Quick add one glass (250ml): <button>Quick Add</button>
      </div>
      <div>
        Add: <input type="text" />
        ml of water <button>Add</button>
      </div>
    </div>
  );
};

export default WaterTracking;
