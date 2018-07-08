import React, { Component } from 'react';
import axios from "axios";

import Heading from "./Heading";
import Button from "./Button";

class Note extends Component {
    constructor() {
        super();

        this.state = {
            notes: [],
            note: "",
            selectedNote: "",
            selectOption: "0",
            isSelected: false
        }

        this.handleAddNoteClick = this.handleAddNoteClick.bind(this);
        this.handleEditNoteClick = this.handleEditNoteClick.bind(this);
        this.handleTextInput = this.handleTextInput.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleTextInput(val) {
        this.setState({
            note: val
        });
    }

    handleEditTextInput(val) {
        this.setState({
            selectedNote: val
        });
    }

    /* handler for the button element in the Button component;*/
    handleAddNoteClick() {
        axios.post("/api/notes", { text: this.state.note }).then(res => {
            this.setState({
                notes: res.data,
                note: ""
            });
        })
    }

    /* handler for the button element in the Button component;*/
    handleEditNoteClick() {
        axios.put(`/api/notes/${this.state.selectOption}`, { text: this.state.selectedNote }).then(res => {
            this.setState({
                notes: res.data,
                isSelected: false,
                selectedNote: ""
            });
        });
    }

    handleOptionChange(val) {
        let changedNote = "";
        this.state.notes.forEach((note, i) => {
            if (note.id === parseInt(val, 10)) changedNote = note.text
        });
        console.log(changedNote);

        this.setState({
            selectOption: val,
            selectedNote: changedNote,
            isSelected: true
        });
    }

    render() {
        console.log(this.state.selectedNote);

        let displayNote = this.state.notes.map((note, i) => {
            return <form key={i}>
                <input
                    type="radio"
                    value={note.id.toString()}
                    checked={this.state.selectOption === note.id.toString()}
                    onChange={(e) => this.handleOptionChange(e.target.value)}
                /> {note.text}
            </form>
        });
        return (
            <div>
                <div>
                    <Heading title="Notes:" />
                    {displayNote}
                </div>
                <div>
                    <Button
                        name="Add Note"
                        handleClick={this.handleAddNoteClick}
                    />
                    <Button
                        name="Edit Note"
                        handleClick={this.handleEditNoteClick}
                    />
                </div>
                <div>
                    <textarea
                        cols="30"
                        rows="3"
                        onChange={
                            this.state.isSelected ?
                                (e) => this.handleEditTextInput(e.target.value) :
                                (e) => this.handleTextInput(e.target.value)
                        }
                        value={
                            this.state.isSelected ?
                                this.state.selectedNote :
                                this.state.note
                        }
                    ></textarea>
                </div>
                {/* <div>
                    <textarea
                        cols="30"
                        rows="3"
                        onChange={(e) => this.handleEditTextInput(e.target.value)}
                        value={this.state.selectedNote}
                    ></textarea>
                </div> */}

            </div>
        );
    }
}

export default Note;