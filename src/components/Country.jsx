import React from "react";
import styles from "./Country.module.css"

const Country = ({ country }) => {
  return (
    <div className={styles.country}>
      <img
        src={country.flags?.svg || country.flags?.png}
        alt={`${country.name.common} flag`}
        style={{ width: "100px", height: "60px" }}
      />
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Area: {country.area.toLocaleString()} km²</p>
      <p>Continents: {country.continents?.join(", ")}</p>
      <p>Subregion: {country.subregion}</p>
    </div>
  );
};

export default Country;
