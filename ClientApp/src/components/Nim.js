import React, { Component } from "react"

export class Nim extends Component {
  static displayName = Nim.name

  constructor(props) {
    super(props)
    this.state = { nim: 1, choice: 1, gameOver: false, playerTurn: true }
  }

  render() {
    let turn = this.state.playerTurn ? "Your turn." : "Opponent's turn."
    let choice = this.state.playerTurn
      ? `Computer chose ${this.state.choice}.`
      : `You chose ${this.state.choice}`

    let gameOver = this.state.gameOver
      ? this.state.playerTurn
        ? "You win!"
        : "You lose!"
      : ""

    return (
      <div>
        <p>
          The game "21" is played as a misère game with any number of players
          who take turns saying a number. The first player says "1" and each
          player in turn increases the number by 1, 2, or 3, but may not exceed
          21; the player forced to say "21", or any greater value, loses.
        </p>
        <h1>Total: {this.state.nim}</h1>

        <h2>{this.state.choice > 0 ? choice : ""} </h2>

        <h2>{this.state.gameOver ? gameOver : turn}</h2>

        <div className="button-row">
          <button className="btn btn-primary" onClick={() => this.getNim(1)}>
            1
          </button>
          <button className="btn btn-primary" onClick={() => this.getNim(2)}>
            2
          </button>
          <button className="btn btn-primary" onClick={() => this.getNim(3)}>
            3
          </button>
        </div>
      </div>
    )
  }

  async getNim(choice = 0) {
    if (choice === 0) {
      return
    }

    this.setState({
      playerTurn: !this.state.playerTurn,
      choice,
      nim: this.state.nim + choice,
    })

    if (this.state.playerTurn && choice + this.state.nim >= 21) {
      this.setState({ gameOver: true })
      return
    }

    const response = await fetch("api/nimgame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nim: this.state.nim, choice }),
    })
    const data = await response.json()
    setTimeout(() => {
      this.setState({
        ...data,
        loading: false,
        playerTurn: !this.state.playerTurn,
      })
    }, 1500)
  }
}
