"use client"
import React, { useState, useEffect } from "react";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import Header from "@/components/Header";
import { expenses as savedExpenses } from "../../data/data";
import {
  FaCar, FaShoppingCart, FaFilm, FaQuestionCircle, FaShoppingBag, FaBolt, FaUtensils, FaHome, FaPiggyBank
} from "react-icons/fa";

const categoryIcons = {
  Personal: <BsPersonFill className="text-purple-800" />,
  Transportation: <FaCar className="text-blue-800" />,
  Entertainment: <FaFilm className="text-red-600" />,
  Groceries: <FaShoppingCart className="text-green-800" />,
  Shopping: <FaShoppingBag className="text-blue-500" />,
  Dining: <FaUtensils className="text-orange-500" />,
  Rent: <FaHome className="text-orange-950" />,
  Utilities: <FaBolt className="text-yellow-500" />,
  Savings: <FaPiggyBank className="text-pink-600" />,
  Other: <FaQuestionCircle className="text-black" />,
};

const Transactions = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  useEffect(() => {
    // Retrieve user-entered expenses from localStorage
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    // Combine saved expenses and user-entered expenses, then sort by most recent date
    const combinedExpenses = [...savedExpenses, ...storedExpenses].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    storedExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    setExpenses(combinedExpenses);
  }, []);

  const openEditModal = (expenseId) => {
    const expenseToEdit = expenses.find((expense) => expense.id === expenseId);
    setCurrentExpense(expenseToEdit);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setCurrentExpense(null);
  };

  const handleEditExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    localStorage.setItem(
      "expenses",
      JSON.stringify(
        updatedExpenses.filter(
          (expense) => !savedExpenses.some((e) => e.id === expense.id)
        )
      )
    );
    closeEditModal();
  };

  const handleDeleteExpense = (expenseId) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);
    setExpenses(updatedExpenses);

    localStorage.setItem(
      "expenses",
      JSON.stringify(updatedExpenses.filter(
        (expense) => !savedExpenses.some((e) => e.id === expense.id)
      ))
    );

    closeEditModal(); 
  };

  return (
    <div className="bg-gray-100 min-h-screen dark:text-black">
      <Header pageName="Transactions Page" />
      <div className="p-4">
        
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Name of Expense</span>
            <span className="sm:text-left text-right">Amount</span>
            <span className="hidden md:grid">Date</span>
            <span className="hidden sm:grid">Category</span>
            <span className="hidden sm:grid">Note</span>
          </div>
          <ul>
            {expenses.map((expense) => (
              <li
                key={`${expense.id}-${expense.date}`} // Combine id and date to ensure uniqueness
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-white border p-3 rounded-lg">
                    {categoryIcons[expense.category] || (
                      <BsPersonFill className="text-gray-800" />
                    )}
                  </div>
                  <p className="pl-4">{expense.name}</p>
                </div>
                <p className="sm:text-left text-right">${expense.amount}</p>
                <p className="hidden md:flex">{expense.date}</p>
                <p className="hidden md:flex">
                  {expense.category}
                </p>
                <div className="hidden sm:flex justify-between items-center">
                  <p>{expense.note}</p>
                  <BsThreeDotsVertical
                    className="cursor-pointer"
                    onClick={() => openEditModal(expense.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      
      {isModalOpen && currentExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Expense</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedExpense = {
                  ...currentExpense,
                  name: e.target.name.value,
                  amount: parseFloat(e.target.amount.value),
                  date: e.target.date.value,
                  category: e.target.category.value,
                  note: e.target.note.value,
                };
                handleEditExpense(updatedExpense);
              }}
            >
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  name="name"
                  defaultValue={currentExpense.name}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={currentExpense.amount}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={currentExpense.date}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Category</label>
                <select
                  name="category"
                  defaultValue={currentExpense.category}
                  className="w-full border p-2 rounded"
                  required
                >
                  {Object.keys(categoryIcons).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Note</label>
                <textarea
                  name="note"
                  defaultValue={currentExpense.note}
                  className="w-full border p-2 rounded"
                ></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteExpense(currentExpense.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
