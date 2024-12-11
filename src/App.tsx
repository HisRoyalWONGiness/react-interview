// Create a simple React application that displays a list of countries and their capitals
// The application should have the following features:

import { useEffect, useState } from "react";
import Countries from "./components/Countries";

// The list of countries and capitals should be fetched from an API
// Each country should be displayed in a separate component
// The user should be able to filter the list by capital

/**
  To fetch all countries use the '/all' endpoint
 */

const BASE_URL = "https://restcountries.com/v3.1";
/**
  To filter by capital city, use the '/capital/{capital}' endpoint
 */

const FILTERABLE_CAPITALS = [
  "Tallinn",
  "Helsinki",
  "Stockholm",
  "Oslo",
  "Copenhagen",
  "Reykjavik",
] as const;
type Capital = (typeof FILTERABLE_CAPITALS)[number];

export interface Country {
  name: {
    common: string;
  };
  capital: string;
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const [countries, setCountries] = useState<Country[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${filter}`);
      const country = await response.json();
      setCountries(country);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [filter]);
  return (
    <div className="App">
      <h1>React Interview</h1>
      <h1>Filter By</h1>
      <button onClick={() => setFilter("all")}>View All Countries</button>
      {FILTERABLE_CAPITALS.map((item) => (
        <button key={item} onClick={() => setFilter(`capital/${item}`)}>
          {item}
        </button>
      ))}
      <ul>
        {countries.map((country) => (
          <Countries country={country} />
        ))}
      </ul>
    </div>
  );
}
