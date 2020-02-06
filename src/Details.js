import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

// this is a Class Component
// it will only work with a render inside
// useState will never be able to function
// inside of a class component
class Details extends React.Component {
  state = { loading: true };
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  // this.props is information you get from parent class that is handed
  // down to you
  componentDidMount() {
    throw new Error("rofl");
    pet.animal(this.props.id).then(({ animal }) =>
      // this.setState will update this.state
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, 
        ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false
      })
    ),
      console.error;
  }
  render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>;
    }

    const { animal, breed, location, description, name, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name} </button>
          <p> {description}</p>
        </div>
      </div>
    );
  }
}
export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
