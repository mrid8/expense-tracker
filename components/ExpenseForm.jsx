"use client";
import { useState } from "react";

export default function ExpenseForm({ onAddExpense }) {
  const [expense, setExpense] = useState({
    name: "",
    category: "",
    date: "",
    amount: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!expense.name) newErrors.name = "Expense name is required.";
    if (!expense.category) newErrors.category = "Category is required.";
    if (!expense.date) newErrors.date = "Date is required.";
    if (!expense.amount || isNaN(expense.amount)) {
      newErrors.amount = "Amount must be a valid number.";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      onAddExpense({ ...expense }); // Pass the new expense to the parent component
      setExpense({ name: "", category: "", date: "", amount: "", note: "" }); // Reset the form
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Add an Expense
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Expense Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={expense.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g. Coffee, Uber ride"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={expense.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Category</option>
            <option value="Personal">Personal</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Groceries">Groceries</option>
            <option value="Shopping">Shopping</option>
            <option value="Dining">Dining</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Saving">Saving</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <p className="text-xs text-red-500">{errors.category}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter amount"
          />
          {errors.amount && (
            <p className="text-xs text-red-500">{errors.amount}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700"
          >
            Note (optional)
          </label>
          <textarea
            id="note"
            name="note"
            value={expense.note}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Any additional details"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-800 text-white font-semibold rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Submit Expense
          </button>
        </div>
      </form>
    </div>
  );
}
