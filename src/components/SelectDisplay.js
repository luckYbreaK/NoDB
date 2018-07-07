import React, { Component } from 'react';

class SelectDisplay extends Component {
    render() {
        console.log(this.props.optionName[0]);
        let value = this.props.optionName[0];
        
        let options = this.props.optionName.map((optionName, i) => {
            // if (i === 0) {
            //     return <option
            //         key={i}
            //     >{optionName.name}</option>
            // }
            return <option
                key={i}
                value={optionName.permalink}
            >{optionName.name}</option>
        });
        return (
            <div>
                <h2>{this.props.name}</h2>
                <select
                    defaultValue={value}
                    onChange={(e) => this.props.handleSelect(e.target.value)}>
                    {options}
                </select>
                <p>{this.props.description}</p>
            </div>
        );

    }
}

export default SelectDisplay;