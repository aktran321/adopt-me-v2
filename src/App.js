// here we create stamp called Pet
const Pet = ({
  name,
  animal,
  breed
}) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, name),
    React.createElement("h2", {}, animal),
    React.createElement("h2", {}, breed)
  ]);
};
//your code is going to go here, for now
//creating a "stamp" that utilizdes the stamp above
const App = () => {
  //anytime we use app we are creating a div and then an h1 tag
  return React.createElement(
    //what kind of element we create
    "div",
    //all of the attributes that we want to give the div
    {
      id: "something-important"
    },
    //this is whatever children we want to pass into the div
    //you could have an array in here as well
    [
      React.createElement("h1", {}, "Adopt Me!"),
      React.createElement(Pet, {
        name: "Luna",
        animal: "Dog",
        breed: "Havanese"
      }),
      React.createElement(Pet, {
        name: "Pepper",
        animal: "Bird",
        breed: "Cockatiel"
      }),
      React.createElement(Pet, {
        name: "Doink",
        animal: "Cat",
        breed: "Mixed"
      })
    ]);
};
//now we are going to render those stamps in the root div 
//this will blow away any text we have inside of the div with id=root
ReactDOM.render(
  //what we are rendering
  React.createElement(App),
  //where we are rendering it
  document.getElementById("root")
);