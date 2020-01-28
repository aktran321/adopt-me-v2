import React, { useState } from "react";
import { ANIMALS } from "@frontendmasters/pet";
import useDropdowm from "./useDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, animalDropdown] = useDropdowm("Animal", "dog", ANIMALS);
  const [breed, breedDropdown] = useDropdowm("Breed", "", breeds);
  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={event => {
              setLocation(event.target.value);
            }}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default SearchParams;
