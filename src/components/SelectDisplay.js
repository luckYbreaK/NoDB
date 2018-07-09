import React, { Component } from 'react';

class SelectDisplay extends Component {
    render() {
        let options = this.props.optionName.map((optionName, i) => {
            return <option
                key={i}
                value={optionName.permalink}
            >{optionName.name}</option>
        });
        // let [a] = this.props.optionName.filter( (optionName, i) => i === 0).map( optionName => optionName.name);


        return (
            <div>
                <select
                    onChange={(e) => this.props.handleSelect(e.target.value)}
                >
                    {options}
                </select>
                <p>{this.props.description} </p>
            </div>
        );

    }
}

export default SelectDisplay;