import { useEffect, useState } from "react";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-date-picker";

import bananaImage from "../images/banana.jpg";
import blueberryImage from "../images/blueberry.jpg";
import grapeImage from "../images/grape.jpg";
import strawberryImage from "../images/strawberry.jpg";
import orangeImage from "../images/orange.jpg";
import pearImage from "../images/pear.jpg";
import watermelonImage from "../images/watermelon.jpg";

//image mapping
const imageMapping = {
  banana: bananaImage,
  blueberry: blueberryImage,
  grape: grapeImage,
  orange: orangeImage,
  pear: pearImage,
  watermelon: watermelonImage,
};

const ConsumeGlobalItem = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [foodObject, setFoodObject] = useState({});
  // Get the user ID from session storage
  const userId = sessionStorage.getItem("userId");
  const [weightConsumed, setWeightConsumed] = useState("");
  const [dateConsumed, setDateConsumed] = useState(new Date());
  //to stop the date picker staying open
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Get the food object
  useEffect(() => {
    axios
      .get(`http://localhost:6001/globalfooditems/byID/${id}`)
      .then((response) => {
        setFoodObject(response.data);
      });
  }, [id]);

  const handleFormSubmit = () => {
    // Validate weightConsumed and dateConsumed
    if (
      !weightConsumed ||
      isNaN(Number(weightConsumed)) ||
      Number(weightConsumed) <= 0
    ) {
      // Invalid or empty weightConsumed
      console.error("Invalid weight consumed");
      return;
    }

    if (!dateConsumed || isNaN(dateConsumed.getTime())) {
      // Invalid or empty dateConsumed
      console.error("Invalid date consumed");
      return;
    }

    const consumptionData = {
      user: userId,
      food: foodObject.id,
      weight: weightConsumed,
      date: dateConsumed,
    };

    // Make the POST request to record the consumption
    axios
      .post("http://localhost:6001/itemconsumption/globalitem", consumptionData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error recording consumption:", error);
      });

    //START OF NUTRIENT_TRACKING TABLE SECTION  

    //calc nutrition consumed
    let nutriEnergy = foodObject.energy * (weightConsumed / 100);
    let nutriProtien = foodObject.protien * (weightConsumed / 100);
    let nutriFibre = foodObject.fibre * (weightConsumed / 100);

    // check if row for consumption date and this user exist in nutrient_tracking table
    const params = { userId: userId, date: dateConsumed.toISOString() };

    axios
      .get("http://localhost:6001/nutrient", { params })
      .then((response) => {
        const nutrientRow = response.data;
        if (nutrientRow) {
          // If a row is found, update it with the new nutrition values
          
          nutriEnergy = nutriEnergy + nutrientRow.energy;
          nutriProtien = nutriProtien + nutrientRow.protien;
          nutriFibre = nutriFibre + nutrientRow.energy;

          const nutriData = {
            id: nutrientRow.id,
            user: nutrientRow.user,
            date: nutrientRow.date,
            energy: nutriEnergy,
            protien: nutriProtien,
            fibre: nutriFibre,
          };

          axios
            .put("http://localhost:6001/nutrient", nutriData)
            .then((response) => {
              console.log(response.data);
              navigate("/userallfooditems");
            })

            .catch((error) => {
              console.error("Error posting nutrient tracking data:", error);
            });
        } else {
          // If the row is null, it means there's no existing record for the user and date

          const nutriData = {
            user: userId,
            date: dateConsumed.toISOString(),
            energy: nutriEnergy,
            protien: nutriProtien,
            fibre: nutriFibre,
          };
          axios
            .post("http://localhost:6001/nutrient", nutriData)
            .then((response) => {
              console.log(response.data);
              navigate("/userallfooditems");
            });
        }
      })
      .catch((error) => {
        console.error("Error posting nutrient tracking data:", error);
      });

    //end handlesubmit
  };

  const getImageSource = () => {
    if (foodObject.image && imageMapping.hasOwnProperty(foodObject.image)) {
      return imageMapping[foodObject.image];
    }
    return strawberryImage; // fallback image
  };

  return (
    <div>
      <h2>{foodObject.food_name}</h2>
      <div className="global-image">
        <img src={getImageSource()} alt={foodObject.food_name} />
      </div>
      <div>food_name:{foodObject.food_name} </div>
      <div>Energy:{foodObject.energy} </div>
      <div>Protien:{foodObject.protien} </div>
      <div>Fibre:{foodObject.fibre} </div>
      <div>
        <Link to="/userallfooditems">
          <button>Back</button>
        </Link>
      </div>
      <div>
        <p>
          {isDatePickerOpen ? (
            <DatePicker
              onChange={(date) => {
                setDateConsumed(date);
                setIsDatePickerOpen(false);
              }}
              value={dateConsumed}
              onClickDay={() => setIsDatePickerOpen(false)}
              onCalendarOpen={() => setIsDatePickerOpen(true)}
              onCalendarClose={() => setIsDatePickerOpen(false)}
            />
          ) : (
            `Date Consumed: ${dateConsumed.toDateString()}`
          )}
          <button onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
            {isDatePickerOpen ? "Done" : "Select Date"}
          </button>
        </p>
        <p>
          Weight consumed:
          <input
            type="text"
            name="weightConsumed"
            value={weightConsumed}
            onChange={(e) => setWeightConsumed(e.target.value)}
          />
          (g)
        </p>
        <button onClick={handleFormSubmit}>Consume</button>
      </div>
    </div>
  );
};

export default ConsumeGlobalItem;
