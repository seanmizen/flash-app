import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPrompt: "",
      newAnswer: "",
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
              tabindex="1"
              placeholder="Type your item here"
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

            <ul>
              {this.state.list.map(item => {
                return (
                  <li key={item.id}>
                    {item.prompt} : {item.answer}
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
