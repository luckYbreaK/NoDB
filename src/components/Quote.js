import React, { Component } from 'react';
import axios from 'axios';

import Heading from './Heading';
import Button from './Button';

class Quote extends Component {
    constructor() {
        super();

        this.state = {
            quote: "",
            input: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(val) {
        this.setState({
            input: val
        });
    }

    handleClick() {
        axios.get(`/api/quote?movie=${this.state.input}`).then(res => {
            this.setState({
                quote: `Quote: "${res.data}"`
            });
        });
    }

    render() {
        return (
            <div className="center_container">
                <Heading title="Type in the name of your favorite Disney movie to find a quote" />
                <input
                    type="text"
                    onChange={(e) => this.handleChange(e.target.value)}
                />
                <Button
                    name="Get Quote"
                    handleClick={this.handleClick}
                />
                <p>{this.state.quote}</p>
            </div>
        );
    }
}

export default Quote;
