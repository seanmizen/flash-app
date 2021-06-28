import React, { Component } from "react";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";

//Adapted from Tiff In Tech's React tutorial (Todo List)

class DeckEditor extends Component {
  constructor(props) {
    super(props);

    //const initList = localStorage.getItem("storageList");

    console.log('home re-rendering');

    this.state = {
      newPrompt: "",
      newAnswer: "",
      list: []
    }
  }

  setLocalStorageState() {
    localStorage.setItem("storageList", this.state.list)
  }

  updateInput(key, value) {
    //update react state
    this.setState({
      [key]: value
    });
  }

  addItem() {
    //create item, assign unique ID
    const newItem = {
      id: 1 + Math.random(),
      prompt: this.state.newPrompt,
      answer: this.state.newAnswer
    }

    //copy current list of items
    const list = [...this.state.list];

    //add new item to list
    list.push(newItem);

    //update state with new list and reset newItem input
    this.setState({
      list,
      newPrompt: "",
      newAnswer: "",
    })
    //this.setLocalStorageState();
  }

  deleteItem(id) {
    //copy current list of items
    const list = [...this.state.list];

    //filter out item being deleted
    const updatedList = list.filter(item => item.id !== id); //ooh, triple equals

    this.setState({ list: updatedList });
    //this.setLocalStorageState();
  }

  render() {
    return (
      <div>
        <div className="deck-editor">
          <h2>Deck Editor</h2>
          <div className="deck-editor-edit-area">
            <h3>Add an item:</h3>
            <AddItemForm />
          </div>

          <div className="deck-editor-item-list">
            <h3>Current Deck:</h3>
            <ItemList
              list={this.state.list}
              onDeleted={id => this.deleteItem(id)}
            />
          </div>

          <div className="deck-editor-save-area">
            <button>Save this deck</button>
            <button>Load a deck</button>
          </div>

        </div>
      </div >
    );
  }
};

export default DeckEditor;
