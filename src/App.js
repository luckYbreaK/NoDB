// npm modules
import React, { Component } from 'react';
import axios from 'axios';
// components
import SelectDisplay from "./components/SelectDisplay";

// CSS
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      attractions : [],
      dining : [],
      ride : " ",
      restaurant : " "
    };

    this.handleAttractionSelect = this.handleAttractionSelect.bind(this);
    this.handleDiningSelect = this.handleDiningSelect.bind(this);
  }


  componentDidMount() {
    let promise1 = axios.get("/api/attractions");
    promise1.then( res => {
      this.setState({
        attractions : res.data.filter( (ride, i) => {
          return i <= 10;
        })
      });
    });

    let promise2 = axios.get("/api/dining");
    promise2.then( res => {
      let arr = [...res.data[0],...res.data[1]].sort( (a, b) => {
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
        dining : arr.filter( (restaurant, i) => {
          return i <= 10;
        })
      });
    });
  }
//*START HERE TRYING TO INCORPORATE DINING INFO
  handleAttractionSelect(val) {
    this.setState({
      ride : val
    }, () => {
      axios.get(`/api/ride/${this.state.ride}`).then( res => {
        this.setState({
            ride : res.data.what_it_is
        })
    })
  })}

  handleDiningSelect(val) {
    this.setState({
      restaurant : val
    }, () => {
      axios.get(`/api/restaurant/${this.state.restaurant}`).then( res => {
        this.setState({
            restaurant : `Cuisine: ${res.data.cuisine}, House Specialties: ${res.data.house_specialties}`
        })
    })
  })}


  render() {
    console.log(this.state.ride);
    
    return (
      <div>
        <main>
          <section>
            {/* Contains dropdown menus, descriptions, and addbutton  */}
            <div>
              <SelectDisplay 
              name="Attractions" 
              optionName={this.state.attractions}
              description={this.state.ride}
              handleSelect={this.handleAttractionSelect}
              />
            </div>
            <div>
              <SelectDisplay 
              name="Dining Options" 
              optionName={this.state.dining}
              description={this.state.restaurant}
              handleSelect={this.handleDiningSelect}
              />
            </div>  
          </section>
          <section>
            {/* Contains heading, activities list, notes, and addnote,editnote, remove activity buttons */}
          </section>
        </main>
      </div>
    );
  }
}

export default App;
