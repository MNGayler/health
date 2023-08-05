import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import UserNavbar from "../Components/Navbars/UserNav";
import styles from "../styles/Charts.module.scss";

const Charts = () => {
  const [waterIntakes, setWaterIntakes] = useState([]);
  const [weightMeasurements, setWeightMeasurements] = useState([]);
  const [nutrientRecords, setNutrientRecords] = useState([]);

  // GET waterIntakes coords
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const headers = { userId: userId };
    axios
      .get("http://localhost:6001/charts/water", { headers })
      .then((response) => {
        const intakes = response.data;
        setWaterIntakes(intakes);
      })
      .catch((error) => {
        console.error("Error fetching water consumptions:", error);
      });
  }, []);

  // // GET weight measurements coords
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const headers = { userId: userId };
    axios
      .get("http://localhost:6001/charts/weight", { headers })
      .then((response) => {
        const intakes = response.data;
        setWeightMeasurements(intakes);
      })
      .catch((error) => {
        console.error("Error fetching weight measurements:", error);
      });
  }, []);

  // get both calorie(energy) and all nutrient intake records(protien and fibre)
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const headers = { userId: userId };

    axios
      .get("http://localhost:6001/charts/nutrients", { headers })
      .then((response) => {
        const records = response.data;
        setNutrientRecords(records);
      })
      .catch((error) => {
        console.error("Error fetching weight measurements:", error);
      });
  }, []);

  // Extract the coordrnates (date, intake)
  const data = waterIntakes.map((intake) => ({
    date: intake.date,
    intake: intake.intake,
  }));

  // Extract the coordinates (date, weight)
  const dataWeights = weightMeasurements.map((weight) => ({
    date: weight.date,
    weight: weight.weight,
  }));

  // Extract the coordinates (date, calorie intake)
  const dataEnergy = nutrientRecords.map((calories) => ({
    date: calories.date,
    energy: calories.energy,
  }));

  // Extract the coodrdinates (date, fibre intake)
  const dataFibre = nutrientRecords.map((vitamin) => ({
    date: vitamin.date,
    fibre: vitamin.fibre,
  }));

  return (
    <div className={styles["charts-outer-container"]}>
      <header>
        <UserNavbar />
      </header>
      <h1>Charts</h1>
      <Link to="/userhome">
        <button>Back</button>
      </Link>

      <div className={styles["charts-inner-container"]}>
        <div className={styles["charts-outer-chart"]}>
          <h2>Water Intake Chart</h2>

          <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="intake" fill="#007bff" />
          </BarChart>
        </div>

        <div className={styles["charts-outer-chart"]}>
          <h2>Weight Chart</h2>
          <BarChart width={600} height={300} data={dataWeights}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="weight" fill="#007bff" />
          </BarChart>
        </div>

        <div className={styles["charts-outer-chart"]}>
          <h2>Calorie Intake Chart</h2>
          <BarChart width={600} height={300} data={dataEnergy}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="energy" fill="#007bff" />
          </BarChart>
        </div>

        <div className={styles["charts-outer-chart"]}>
          <h2>Fibre Intake Chart</h2>
          <BarChart width={600} height={300} data={dataFibre}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="fibre" fill="#007bff" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Charts;
