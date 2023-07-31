import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  // Hardcoded data for the bar chart
  const data = {
    labels: ["Column 1", "Column 2"],
    datasets: [
      {
        label: "Data Set 1",
        data: [50, 70],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;