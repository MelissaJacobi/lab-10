import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState({ continent: "", subregion: "", top10: false });
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    };
    fetchData();
  }, []);

  const handleFilterChange = (type, value) => {
    setFilter((prev) => ({
      ...prev,
      [type]: value,
      ...(type === "continent" ? { subregion: "" } : { continent: "" }),
    }));
  };

  const handleSortChange = (order) => setSortOrder(order);

  const filteredCountries = countries
    .filter((country) => {
      if (filter.continent) return country.continents?.includes(filter.continent);
      if (filter.subregion) return country.subregion === filter.subregion;
      return true;
    })
    .slice(0, filter.top10 ? 10 : countries.length);

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    if (sortOrder === "alphabetical") return a.name.common.localeCompare(b.name.common);
    return 0;
  });

  return (
    <div>
      <h1>Country Explorer</h1>
      <div>
        <button onClick={() => handleFilterChange("continent", "Asia")}>Filter by Asia</button>
        <button onClick={() => handleFilterChange("subregion", "Southern Asia")}>Filter by Southern Asia</button>
        <button onClick={() => handleFilterChange("top10", !filter.top10)}>
          {filter.top10 ? "Show All" : "Top 10 by Population"}
        </button>
        <button onClick={() => handleSortChange("alphabetical")}>Sort Alphabetically</button>
      </div>
      <Countries countries={sortedCountries} />
    </div>
  );
};

export default App;
