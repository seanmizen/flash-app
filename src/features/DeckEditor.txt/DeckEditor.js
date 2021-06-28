import React, { Component } from "react";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";

//Adapted from Tiff In Tech's React tutorial (Todo List)

class DeckEditor extends Component {
  constructor(props) {
    super(props);

    //const initList = localStorage.getItem("storageList");

    console.log('home rendering');

    this.state = {
      list: []
    }
  }

  setLocalStorageState() {
    localStorage.setItem("storageList", this.state.list)
  }

  addItem({ prompt, answer }) {
    //create item, assign unique ID
    const newItem = {
      id: 1 + Math.random(),
      prompt,
      answer
    }

    //update state with new list and reset newItem input
    this.setState({
      list: [...this.state.list, newItem]
    })
    //this.setLocalStorageState();
  }

  deleteItem(id) {
    //filter out item being deleted
    const updatedList = this.state.list.filter(item => item.id !== id); //ooh, triple equals

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
            <AddItemForm
              onAdd={e => this.addItem(e)}
            />
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
