import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: "",
      list: []
    }
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
      value: this.state.newItem.slice()
    }

    //copy current list of items
    const list = [...this.state.list];

    //add new item to list
    list.push(newItem);

    //update state with new list and reset newItem input
    this.setState({
      list,
      newItem: "Default Value"
      //interesting: if you add "Default Value" in here it doesn't appear in the textbox until you add a value.
      //makes sense though - this is the function to reset the state. duh!
    })
  }

  deleteItem(id) {
    //copy current list of items
    const list = [...this.state.list];

    //filter out item being deleted
    const updatedList = list.filter(item => item.id !== id); //ooh, triple equals

    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            Add an item:
            <br />
            <input
              type="text"
              placeholder="Type your item here"
              value={this.state.newItem}
              onChange={e => this.updateInput("newItem", e.target.value)}
            />

            <button
              onClick={() => this.addItem()}
            >
              Add
            </button>

            <ul>
              {this.state.list.map(item => {
                return (
                  <li key={item.id}>
                    {item.value}
                    <button
                      onClick={() => this.deleteItem(item.id)}
                    >X</button>
                  </li>
                )
              })}
            </ul>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
