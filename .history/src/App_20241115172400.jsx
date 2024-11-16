import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import styles from "./App.module.css"

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState(null);

  const [continentFilter, setContinentFilter] = useState("");
  const [subregionFilter, setSubregionFilter] = useState("");
  const [top10Filter, setTop10Filter] = useState(false);
  const [topBy, setTopBy] = useState("population");
  const [sortAlphabetically, setSortAlphabetically] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let updatedCountries = [...countries];

    if (continentFilter) {
      updatedCountries = updatedCountries.filter((country) =>
        country.continents?.includes(continentFilter)
      );
    }

    if (subregionFilter) {
      updatedCountries = updatedCountries.filter(
        (country) => country.subregion === subregionFilter
      );
    }

    if (top10Filter) {
      updatedCountries = updatedCountries
        .sort((a, b) => b[topBy] - a[topBy])
        .slice(0, 10);
    }

    if (sortAlphabetically) {
      updatedCountries = updatedCountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    }

    setFilteredCountries(updatedCountries);
  }, [
    continentFilter,
    subregionFilter,
    top10Filter,
    topBy,
    sortAlphabetically,
    countries,
  ]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (filteredCountries.length === 0) {
    return <div>Loading...</div>;
  }

  const continents = [...new Set(countries.map((country) => country.continents).flat())];
  const subregions = [
    ...new Set(countries.map((country) => country.subregion).filter((sub) => sub)),
  ];

  return (
    <div>
      <h1>Country of the world</h1>

      <div className={styles.form}>
        {/* Continent Filter */}
        <label>
          Continent:
          <select
            value={continentFilter}
            onChange={(e) => {
              setContinentFilter(e.target.value);
              setSubregionFilter("");
            }}
          >
            <option value="">All</option>
            {continents.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </label>

        {/* Subregion Filter */}
        <label>
          Subregion:
          <select
            value={subregionFilter}
            onChange={(e) => {
              setSubregionFilter(e.target.value);
              setContinentFilter("");
            }}
          >
            <option value="">All</option>
            {subregions.map((subregion) => (
              <option key={subregion} value={subregion}>
                {subregion}
              </option>
            ))}
          </select>
        </label>

        {/* Top 10 Filter */}
        <label>
          Top 10 by:
          <select className={styles.topTen} value={topBy} onChange={(e) => setTopBy(e.target.value)}>
            <option value="population">Population</option>
            <option value="area">Area</option>
          </select>
          <input
            type="checkbox"
            checked={top10Filter}
            onChange={() => setTop10Filter(!top10Filter)}
          />
          Show Top 10
        </label>

        {/* Sort Alphabetically */}
        <label>
          <input
            type="checkbox"
            checked={sortAlphabetically}
            onChange={() => setSortAlphabetically(!sortAlphabetically)}
          />
          Sort Alphabetically
        </label>
      </div>
      
      

      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
