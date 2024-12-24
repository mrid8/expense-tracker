"use client";
import { useState, useEffect } from "react";

const Header = ({ pageName }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  return (
    <div className="flex justify-between px-4 pt-4 dark:text-black">
      <h2>{pageName ? pageName : "Expense Tracker Dashboard"}</h2>
      <h2>Welcome Back, {name || "Guest"}!</h2>
    </div>
  );
};

export default Header;
