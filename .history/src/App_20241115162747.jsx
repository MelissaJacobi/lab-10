import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (countries.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Country Explorer</h1>
      <Countries countries={countries} />
    </div>
  );
};

export default App;
