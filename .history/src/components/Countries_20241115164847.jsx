import React from "react";
import Country from "./Country";
import styles from "./Countries.module.css"

const Countries = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <Country key={country.cca3} country={country} />
      ))}
    </div>
  );
};

export default Countries;
