import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    //const initList = localStorage.getItem("storageList");

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

            {/* <ul>
              {this.state.list.map(item => {
                return (
                  <li key={item.id}>
                    <div className="item-prompt">{item.prompt}</div>
                    <div className="item-answer">{item.answer}</div>
                    <button
                      onClick={() => this.deleteItem(item.id)}
                    >X</button>
                  </li>
                )
              })}
            </ul> */}

            <ItemList
              list={this.state.list}
              onDeleted={id => this.deleteItem(id)}
            />

          </div>
        </header>
      </div>
    );
  }
};

class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ul>
      {this.props.list.map(item => {
        return (
          <li key={item.id}>
            <div className="item-prompt">{item.prompt}</div>
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

export default App;
