import React, { Component } from "react";

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
        <span>test</span>
        <div className="deck-editor">
          <h2>Deck Editor</h2>
          <div className="deck-editor-edit-area">
            <h3>Add an item:</h3>
            <input
              type="text"
              tabindex="1"
              placeholder="Type your prompt here"
              value={this.state.newPrompt}
              onChange={e => this.updateInput("newPrompt", e.target.value)}
            />
            <button
              tabindex="3"
              onClick={() => this.addItem()}
            >
              Add
            </button>
            <br />
            <textarea
              type="text"
              tabindex="2"
              placeholder="Type the answer to the prompt here"
              value={this.state.newAnswer}
              onChange={e => this.updateInput("newAnswer", e.target.value)}
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

class ItemList extends React.Component {
  render() {
    return <ul>
      {this.props.list.map(item => {
        return (
          <li key={item.id}>
            <div className="item-prompt"><b>{item.prompt}</b></div>
            <div className="item-answer">{item.answer}</div>
            <button
              onClick={() => this.props.onDeleted(item.id)}
            >X</button>
          </li>
        )
      })}
    </ul>
  }
}

export default DeckEditor;
