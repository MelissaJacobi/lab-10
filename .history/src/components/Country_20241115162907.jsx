import React from "react";

const Country = ({ country }) => {
  return (
    <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
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
