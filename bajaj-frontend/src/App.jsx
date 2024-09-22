import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/bfhl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedInput),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message === "Unexpected token" ? "Invalid JSON format" : err.message);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div className="mt-4">
        {selectedOptions.includes("Alphabets") && <p className="text-lg">Alphabets: {response.alphabets.join(", ")}</p>}
        {selectedOptions.includes("Numbers") && <p className="text-lg">Numbers: {response.numbers.join(", ")}</p>}
        {selectedOptions.includes("Highest lowercase alphabet") && (
          <p className="text-lg">Highest lowercase alphabet: {response.highest_lowercase_alphabet.join(", ")}</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Bajaj Finserv Frontend Challenge</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON here. E.g. { "data": ["A","C","z"] }'
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          Submit
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {response && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Select options to display:</h2>
          <select
            multiple
            value={selectedOptions}
            onChange={(e) => setSelectedOptions(Array.from(e.target.selectedOptions, (option) => option.value))}
            className="w-full border border-gray-300 rounded p-2 mt-2"
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
