import React from "react";
import { Country } from "../App";

export interface CountryProps {
  country: Country;
}

const Countries: React.FC<CountryProps> = ({ country }) => {
  return (
    <li key={country.name.common}>
      Country: {country.name.common}
      <br />
      Capital: {country.capital && country.capital[0]}
    </li>
  );
};

export default Countries;
