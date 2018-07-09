import React, { Component } from 'react';
import axios from "axios";

import Heading from "./Heading";
import Button from "./Button";


class List extends Component {
    constructor() {
        super();

        this.state = {
            //array of objects
            todo_attractions: [],
            //array of objects
            todo_dining: [],
            selectedRideOption: "0",
            selectedRestaurantOption: "0"
        }

        this.handleAddRideClick = this.handleAddRideClick.bind(this);
        this.handleAddRestaurantClick = this.handleAddRestaurantClick.bind(this);
        this.handleRemoveRideClick = this.handleRemoveRideClick.bind(this);
        this.handleRemoveRestaurantClick = this.handleRemoveRestaurantClick.bind(this);
        this.handleRideOptionChange = this.handleRideOptionChange.bind(this);
        this.handleRestaurantOptionChange = this.handleRestaurantOptionChange.bind(this);
    }

    handleAddRideClick() {
        let { name } = this.props.activityName;
        // let { name } = this.state.attractions
        //     .filter(attraction => {
        //         return attraction.permalink === this.state.ride
        //     })[0];
        axios.post("/api/attractions", { name: name }).then((res) => {
            this.setState({
                todo_attractions: res.data
            })
            // console.log("Attraction: ", this.state.todo_attractions);

        });
    }

    handleAddRestaurantClick() {
        let { name } = this.props.activityName;
        // let { name } = this.state.dining
        //     .filter(restaurant => {
        //         return restaurant.permalink === this.state.restaurant
        //     })[0];
        axios.post("/api/dining", { name: name }).then((res) => {
            this.setState({
                todo_dining: res.data
            })
            // console.log("Dining: ", this.state.todo_dining);

        });
    }

    handleRemoveRideClick() {
        let id = this.state.selectedRideOption

        axios.delete(`/api/attractions/${id}`).then(res => {
            this.setState({
                todo_attractions: res.data
            });
        });
    }

    handleRemoveRestaurantClick() {
        let id = this.state.selectedRestaurantOption

        axios.delete(`/api/dining/${id}`).then(res => {
            this.setState({
                todo_dining: res.data
            });
        });
    }

    handleRideOptionChange(id) {
        this.setState({
            selectedRideOption: id
        });
    }

    handleRestaurantOptionChange(id) {
        this.setState({
            selectedRestaurantOption: id
        });
    }



    render() {
        // console.log("Ride",this.state.selectedRideOption);
        // console.log("Restaurant",this.state.selectedRestaurantOption);


        let arr = this.props.title === "Attractions:" ?
            [...this.state.todo_attractions] : [...this.state.todo_dining];
        let displayArr = arr.map((elem, i) => {
            return <form key={i}>
                <input
                    type="radio"
                    value={elem.id.toString()}
                    checked={this.props.title === "Attractions:" ?
                        this.state.selectedRideOption === elem.id.toString() :
                        this.state.selectedRestaurantOption === elem.id.toString()
                    }
                    onChange={this.props.title === "Attractions:" ?
                        (e) => this.handleRideOptionChange(e.target.value) :
                        (e) => this.handleRestaurantOptionChange(e.target.value)
                    }
                /> {elem.name}
            </form>
        });

        return (
            <div className="list_container">
                <div className="button_container">
                    <Button
                        name={this.props.addButtonName}
                        handleClick={this.props.title === "Attractions:" ?
                            this.handleAddRideClick : this.handleAddRestaurantClick}
                    />
                    <Button
                        name={this.props.deleteButtonName}
                        handleClick={this.props.title === "Attractions:" ?
                            this.handleRemoveRideClick : this.handleRemoveRestaurantClick}
                    />
                </div>
                <div className="todo_container">
                    <div className="center">
                        <Heading title={this.props.title} />
                    </div>
                    <div>
                        {displayArr}
                    </div>
                </div>
            </div>

        );
    }
}

export default List;