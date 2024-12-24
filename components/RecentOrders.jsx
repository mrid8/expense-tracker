import React, { useState, useEffect } from "react";
import { expenses as defaultExpenses } from "../data/data";
import { BsPersonFill } from "react-icons/bs";
import { FaCar, FaShoppingCart, FaQuestionCircle, FaUtensils, FaHome, FaPiggyBank, FaFilm, FaBolt, FaShoppingBag } from "react-icons/fa";

const RecentOrders = () => {
  const [allExpenses, setAllExpenses] = useState([]);

  const categoryIcons = {
    Personal: <BsPersonFill className="text-purple-800" />,
    Transportation: <FaCar className="text-blue-800" />,
    Entertainment: <FaFilm className="text-red-600" />,
    Groceries: <FaShoppingCart className="text-green-800" />,
    Shopping: <FaShoppingBag className="text-blue-500" />,
    Dining: <FaUtensils className="text-orange-600" />,
    Rent: <FaHome className="text-orange-950" />,
    Utilities: <FaBolt className="text-yellow-600"/>,
    Savings: <FaPiggyBank className="text-pink-600" />,
    Other: <FaQuestionCircle className="text-black" />,
  };

  useEffect(() => {
    // Retrieve user-entered expenses from localStorage
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    // Sort the user-entered expenses by date (most recent first)
    storedExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Sort default expenses by date (most recent first)
    defaultExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Combine default expenses with user-entered expenses and update state
    setAllExpenses([...defaultExpenses, ...storedExpenses]);
  }, []);

  return (
    <div className="w-full col-span-2 relative lg:h-[70vh] h-[50vh] p-4 border rounded-lg bg-white overflow-scroll">
      <h1>Recent Transactions</h1>
      <ul>
        {allExpenses.map((order, id) => (
          <li
            key={id}
            className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
          >
            <div className="bg-white border rounded-lg p-3">
              {categoryIcons[order.category] || <BsPersonFill className="text-gray-800" />}
            </div>
            <div className="pl-4">
              <p className="text-gray-800 font-bold">${order.amount}</p>
              <p className="text-gray-400 text-sm">{order.name}</p>
            </div>
            <p className="lg:flex md:hidden absolute right-6 text-sm">{order.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentOrders;
