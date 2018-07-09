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
      // //array of objects
      // todo_attractions: [],
      // //array of objects
      // todo_dining: []
    };

    this.handleAttractionSelect = this.handleAttractionSelect.bind(this);
    this.handleDiningSelect = this.handleDiningSelect.bind(this);
    // this.handleAddRideClick = this.handleAddRideClick.bind(this);
    // this.handleAddRestaurantClick = this.handleAddRestaurantClick.bind(this);
    // this.handleRemoveClick = this.handleRemoveClick.bind(this);
    // this.handleAddNoteClick = this.handleAddNoteClick.bind(this);
    // this.handleEditNoteClick = this.handleEditNoteClick.bind(this);
  }

  /* external API requests to TouringPlans.com; the requests are for attraction and dining info at the
  Magic Kingdom at Disney World */
  componentDidMount() {
    let promise1 = axios.get("/api/attractions");
    promise1.then(res => {
      this.setState({
        attractions: res.data.filter((ride, i) => {
          return i <= 10;
        })
      });
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
          return i <= 10;
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
          displayRestaurant: `Cuisine: ${res.data.cuisine}, House Specialties: ${res.data.house_specialties}`
        })
      })
    })
  }

  /* handler for the button element in the Button component; utilizes the state.ride property to 
  extract the attraction name from the state.attractions array of objects*/
  // handleAddRideClick() {
  //   let { name } = this.state.attractions
  //     .filter(attraction => {
  //       return attraction.permalink === this.state.ride
  //     })[0];
  //   axios.post("/api/attractions", { name: name }).then((res) => {
  //     this.setState({
  //       todo_attractions: res.data
  //     })
  //   });
  // }

  /* handler for the button element in the Button component;*/
  // handleAddRestaurantClick() {
  //   let { name } = this.state.dining
  //     .filter(restaurant => {
  //       return restaurant.permalink === this.state.restaurant
  //     })[0];
  //   axios.post("/api/dining", { name: name }).then((res) => {
  //     this.setState({
  //       todo_dining: res.data
  //     })
  //   });
  // }

  /* handler for the button element in the Button component;*/
  // handleRemoveClick() {

  // }



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
          <section>
            {/* Contains dropdown menus, descriptions, and addbutton  */}
            <div className="select_display_container">
              <Heading title="Attractions" />
              <SelectDisplay
                name="Attractions"
                optionName={this.state.attractions}
                description={this.state.displayRide}
                handleSelect={this.handleAttractionSelect}
              />
            </div>
            {/* <div>
              <Heading title="Activities To Do!" />
            </div> */}
            <List
              title="Attractions:"
              addButtonName="Add Attraction To Activities"
              deleteButtonName="Remove Attraction"
              activityName={attractionName}
            // array={this.state.todo_attractions}
            />


          </section>
          <section>
            {/* Contains heading, activities list, notes, and addnote,editnote, remove activity buttons */}
            <div className="select_display_container">
              <Heading title="Dining Options" />
              <SelectDisplay
                name="Dining Options"
                optionName={this.state.dining}
                description={this.state.displayRestaurant}
                handleSelect={this.handleDiningSelect}
              />
            </div>
            <div>
              <List
                title="Dining:"
                addButtonName="Add Restaurant To Dining"
                deleteButtonName="Remove Restaurant"
                activityName={diningName}
              // array={this.state.todo_dining}
              />
            </div>
          </section>
          <section>
            <div>
              <Note className="list_display_container" />
            </div>
          </section>
          <section>
            <Quote />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
