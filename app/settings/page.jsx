"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";

export default function Settings() {
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Success or error message

  // Load the name from localStorage when the component mounts
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const handleSave = () => {
    if (!name.trim()) {
      setMessage("Please enter a name before saving.");
      return;
    }

    setIsSaving(true);
    localStorage.setItem("userName", name); // Save the name to localStorage

    setTimeout(() => {
      setIsSaving(false);
      setMessage("Name saved successfully!");
    }, 500); // Simulate saving delay
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header pageName="Settings Page" />
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <div className="mb-4">
          <label htmlFor="name" className="text-gray-800 text-lg">
            Your Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 mt-2 w-full rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your name"
          />
        </div>

        {message && (
          <div
            className={`mb-4 p-2 rounded-md text-white ${
              message.includes("saved") ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-purple-800 text-white py-2 rounded-lg disabled:opacity-50 hover:bg-purple-700 transition duration-300"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
