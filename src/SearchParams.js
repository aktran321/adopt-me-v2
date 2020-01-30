import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "./useDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

  //an async function is guaranteed to return a promise
  //that resolves when this function completes
  async function requestPets() {
    // "await" can only nbe used inside an async block
    // it is an operator used to wait for a promise
    // note that is only makes the async block wait, not the whole program
    const { animals } = await pet.animals({
      //pet.animals returns a promise itself
      //you could say pet.animals({}).then({})
      //or use async await
      location,
      breed,
      type: animal
    });
    // because we used "await", we are guaranteed that "animals" api will be finished by the time we get to here
    setPets(animals || []);
    // setPets is equal to either "animals" OR empty array if animals isn't finished for some reason
  }

  //useEffect is diconnected from the render, however it only fires after render
  //after searchParams renders for the first time, then useEffect runs
  //
  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      const breedStrings = apiBreeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
    //useEffect only refires if animal, setBreed, or setBreeds changes
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form
        onSubmit={e => {
          // prevents from submitting an html post form
          e.preventDefault();
          requestPets();
        }}
      >
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
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};
export default SearchParams;
