import React from "react";
import { Link } from "react-router-dom";

const WaterTracking = () => {
  return (
    <div>
      <h1> water tracking</h1>
      <Link to="/userhome">
        <button>Back</button>
      </Link>

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
