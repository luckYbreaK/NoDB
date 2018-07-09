import React from "react";

function Button(props) {
    return(
        <button 
        onClick={ () => props.handleClick()}
        style={props.name === "Add Note" || props.name === "Edit Selected Note" ? {backgroundColor: "#e8122e"} : {backgroundColor: "black"}}
        >{props.name}</button>
    );
}

export default Button;