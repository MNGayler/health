import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import banana from "../images/banana.jpg"


const ViewGlobalFoodItem = () => {
  let { id } = useParams();
  const [foodObject, setFoodObject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:6001/globalfooditems/byID/${id}`).then((response) => {
        setFoodObject(response.data);
      });
  }, [id]);

  return (
    <div>
      <h1>Veiwing item with id: {id}</h1>
      <h2>{foodObject.food_name}</h2>
      <div className="global-image"><img src={banana} alt="banana" /> </div>
      <div>food_name:{foodObject.food_name} </div>
      <div>Energy:{foodObject.energy} </div>
      <div>Protien:{foodObject.protien} </div>
      <div>Fibre:{foodObject.fibre} </div>

      <p></p>
    </div>
  );
};

export default ViewGlobalFoodItem;
