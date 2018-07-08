import React, { Component } from 'react';
import Heading from "./Heading";

class List extends Component {
    constructor() {
        super();

        this.state = {
            list : []
        }
    }

    render(){
        console.log(this.props.array);
        
        return(
            <div>
                <Heading title={this.props.title}/>
            </div>
        );
    }
}

export default List;