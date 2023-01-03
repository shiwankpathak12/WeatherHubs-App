import React, { useState , useEffect} from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
import './search.css'

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
 
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
     <div className="header">
     <img src = "icons/partly-cloudy-day.svg" alt="My Happy SVG" className="logo"/>  
     <span className="app-name">WeatherHubs</span>  
    <AsyncPaginate className="search-input"
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    /></div>
  );
};

export default Search;