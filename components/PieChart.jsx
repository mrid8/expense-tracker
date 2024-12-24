"use client";

import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { expenses } from "../data/data.js";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Calculate the total amount for each category
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    // Prepare the chart data
    setChartData({
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: "Expenses",
          data: Object.values(categoryTotals),
          backgroundColor: [
            "rgb(128, 90, 213)", // Personal - Purple
            "rgb(53, 162, 235)", // Transportation - Blue
            "rgb(75, 192, 192)", // Groceries - Green
            "rgb(255, 99, 132)", // Dining - Red
            "rgb(255, 206, 86)", // Rent - Yellow
            "rgb(255, 159, 243)", // Savings - Pink
          ],
          borderWidth: 1,
        },
      ],
    });

    // Set chart options
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Expense Distribution by Category",
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    });
  }, []); // Only runs on component mount

  return (
    <div className="w-full md:col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChart;
