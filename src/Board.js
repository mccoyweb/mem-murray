import React from 'react';
import './Board.css';

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: ['murray1','murray2','murray3','murray4','murray5','murray6','murray7','murray8','murray9','murray10','murray11','murray12','murray13','murray14','murray15'],
      finalDeck: [],
      flippedCards: []
    };
    this.start();  
  }

  start() {
    let doubleDeck = this.state.deck.concat(this.state.deck);
    this.shuffle(doubleDeck);
    doubleDeck.map(name => {
      this.state.finalDeck.push({
        name,
        flipped: false,
        complete: false
      })
    });
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  handleClick(card, index) {
    let updateDeck = this.state.finalDeck;
    if (!updateDeck[index].flipped && this.state.flippedCards.length < 2) {
      updateDeck[index].flipped = true;
      this.state.flippedCards.push([card, index]);
      if (this.state.flippedCards.length === 2) {
        
        setTimeout(() => {
          if (this.check() === false) {
            updateDeck[index].flipped = false;
            updateDeck[this.state.flippedCards[0][1]].flipped = false;
            console.log(index);
          }
          this.setState({ flippedCards: [] });
        },750)

      }
    }

    this.setState({
      finalDeck: updateDeck
    });
  }

  check() {
    if (this.state.flippedCards[0][0].name === this.state.flippedCards[1][0].name) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="board">
        {
          this.state.finalDeck.map((card, index) => {
            return <Card cardName={card.name} click={() => this.handleClick(card, index)} flipped={card.flipped}/>
          })
        }
      </div>
    );
  }
}

function Card(props) {
  return (
    <div className={"card" + (props.flipped ? ' flipped' : '')} onClick={props.click}>
      <div className="front">?</div>
      <div className="back">
        <img src={props.cardName + ".jpg"}/>
      </div>
    </div>
  );
}

export default Board;