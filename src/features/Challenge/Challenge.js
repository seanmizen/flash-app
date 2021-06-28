import React, { Component } from "react";
import LoadDeckFromFile from "../DeckEditor/components/LoadDeckFromFile";
import Arena from "./components/Arena";

class Challenge extends Component {
    constructor(props) {
        super(props);
        console.log('Challenge rendering');
        this.state = {
            deckName: "",
            list: []
        }
    }

    loadDeck(deck) {
        this.setState({
            deckName: deck.deckName,
            list: deck.list
        })
    }

    render() {
        return (
            <div>
                <div className="deck-challenge-arena">
                    <Arena
                        deck={this.state}
                        loadDeckCallback={(e) => this.loadDeck(e)}
                    />
                </div>
                {this.state.list.length === 0 ? null :
                    <div className="deck-challenge-information-area">
                        <span>
                            Deck name: {this.state.deckName}
                        </span>
                        <br />
                        <span>
                            Deck Length: {this.state.list.length}
                        </span>
                    </div>
                }
                <div className="deck-challenge-load-area">
                    <LoadDeckFromFile
                        onDeckLoad={e => this.loadDeck(e)}
                    />
                </div>
            </div>
        );
    }
};

export default Challenge;
