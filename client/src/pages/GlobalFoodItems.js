import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import banana from "../images/banana.jpg"

const GlobalFoodItems = () => {
  let navigate = useNavigate()
  const [listOfGlobalFoodItems, setListOfGloabalFoodItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:6001/globalfooditems").then((response) => {
      setListOfGloabalFoodItems(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <h1>List Global</h1>

      <Link to="/globaladditem">
        <button>Add New Item</button>
      </Link>
      <div className="item-container">
      {listOfGlobalFoodItems.map((value, key) => {
        return (
          <div className="item">
            <div><img src={banana} alt="banana" /></div>
            <div>Food Name: {value.food_name}</div>
            <div className="buttons">
              <button onClick={() => {navigate(`/viewglobalfooditem/${value.id}`)}}>View</button>
              <button>Update</button>
              <button>Delete</button>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default GlobalFoodItems;
