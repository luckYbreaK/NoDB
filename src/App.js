// npm modules
import React, { Component } from 'react';
import axios from 'axios';
// components
import SelectDisplay from "./components/SelectDisplay";
// import Button from "./components/Button";
import Heading from "./components/Heading";
import List from "./components/List";
import Note from "./components/Note";
import Quote from "./components/Quote";
// CSS
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      //array of objects
      attractions: [],
      //array of objects
      dining: [],
      ride: "astro-orbiter",
      displayRide: " ",
      restaurant: "be-our-guest",
      displayRestaurant: " ",
    };

    this.handleAttractionSelect = this.handleAttractionSelect.bind(this);
    this.handleDiningSelect = this.handleDiningSelect.bind(this);
  }

  /* external API requests to TouringPlans.com; the requests are for attraction and dining info at the
  Magic Kingdom at Disney World */
  componentDidMount() {
    let promise1 = axios.get("/api/attractions");
    promise1.then(res => {
      this.setState({
        attractions: res.data.filter((ride, i) => {
          return i <= 20;
        })
      })
    });
  

    let promise2 = axios.get("/api/dining");
    promise2.then(res => {
      let arr = [...res.data[0], ...res.data[1]].sort((a, b) => {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      this.setState({
        dining: arr.filter((restaurant, i) => {
          return i <= 20;
        })
      });
    });
  }

  /* handler for the select element in the SelectDisplay component; the ride value in App.js is assigned
  the value of the select option which is then used in an external API request to dynamically display info
  about the attraction selected */
  handleAttractionSelect(val) {
    this.setState({
      ride: val
    }, () => {
      axios.get(`/api/ride/${this.state.ride}`).then(res => {
        this.setState({
          displayRide: res.data.what_it_is
        })
      })
    })
  }

  /* handler for the select element in the SelectDisplay component; the restaurant value in App.js is 
  assigned the value of the select option which is then used in an external API request to dynamically 
  display info about the restaurant selected */
  handleDiningSelect(val) {
    this.setState({
      restaurant: val
    }, () => {
      axios.get(`/api/restaurant/${this.state.restaurant}`).then(res => {
        this.setState({
          displayRestaurant: <div>Cuisine: {res.data.cuisine}<br />House Specialties: {res.data.house_specialties}</div>
        })
      })
    })
  }

  render() {
    // console.log("Attractions Array: ",this.state.attractions);
    // console.log("Ride: ",this.state.ride);


    let attractionName = this.state.attractions
      .filter(attraction => {
        return attraction.permalink === this.state.ride
      })[0];

    let diningName = this.state.dining
      .filter(restaurant => {
        return restaurant.permalink === this.state.restaurant
      })[0];

    return (
      <div>
        <main>
          <section className="attraction_container">
            {/* Contains dropdown menus, descriptions, and addbutton  */}
            <div className="select_container">
              <Heading title="Attractions" />
              <SelectDisplay
                name="Attractions"
                optionName={this.state.attractions}
                description={this.state.displayRide}
                handleSelect={this.handleAttractionSelect}
              />
            </div>
            <List
              title="Attractions:"
              addButtonName="Add Attraction To Activities"
              deleteButtonName="Remove Selected Attraction"
              activityName={attractionName}
            // array={this.state.todo_attractions}
            />
          </section>
          <section className="dining_container">
            {/* Contains heading, activities list, notes, and addnote,editnote, remove activity buttons */}
            <div className="select_container">
              <Heading title="Dining Options" />
              <SelectDisplay
                name="Dining Options"
                optionName={this.state.dining}
                description={this.state.displayRestaurant}
                handleSelect={this.handleDiningSelect}
              />
            </div>
            <List
              title="Dining:"
              addButtonName="Add Restaurant To Dining"
              deleteButtonName="Remove Selected Restaurant"
              activityName={diningName}
            // array={this.state.todo_dining}
            />
          </section>
          <section className="note_container">
            <div>
              <img src="https://yt3.ggpht.com/a-/ACSszfHZmd96lhbDCGocqrcTgYZ4KmeDGQ5korwfdQ=s900-mo-c-c0xffffffff-rj-k-no" alt="mickey mouse" />
            </div>
            <Note />
          </section>
          <section className="quote_container">
            <Quote />
          </section>
        </main>
      </div>
    );
  }
}

export default App;