"use client";
import ExpenseForm from "../../components/ExpenseForm";
import Header from "@/components/Header";
import { sampleExpenses } from "../../data/data.js";
import { useEffect, useState } from "react";

export default function Expense() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    setExpenses(storedExpenses || sampleExpenses); // Fallback to sample data if null
  }, []);

  const handleAddExpense = (newExpense) => {
    const updatedExpenses = [...(expenses || []), newExpense]; // Ensure expenses is iterable
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header pageName="Expense Form" />
      <ExpenseForm className="bg-gray-100" onAddExpense={handleAddExpense} />
    </div>
  );
}
