import React, { Component } from "react"

export class Nim extends Component {
  static displayName = Nim.name

  defaultState = {
    total: 1,
    choice: 1,
    gameOver: false,
    playerTurn: true,
    playerWon: false,
  }

  constructor(props) {
    super(props)
    this.state = { ...this.defaultState }
  }

  reset() {
    this.setState({ ...this.defaultState })
  }

  buttonDisplay(gameOver) {
    if (gameOver) {
      return (
        <div>
          <button className="btn btn-primary" onClick={() => this.reset()}>
            Reset
          </button>
        </div>
      )
    } else {
      return (
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
      )
    }
  }

  render() {
    let turn = this.state.playerTurn ? "Your turn." : "Opponent's turn."
    let choice = this.state.playerTurn
      ? `Computer chose ${this.state.choice}.`
      : `You chose ${this.state.choice}`

    let gameOver = this.state.gameOver
      ? this.state.playerWon
        ? "You win!"
        : "You lose!"
      : ""

    return (
      <div>
        <h1>Total: {this.state.total}</h1>

        <h2>{this.state.choice > 0 ? choice : ""} </h2>
        <h2>{this.state.gameOver ? gameOver : turn}</h2>
        <p>
          The game "21" is played as a misère game with any number of players
          who take turns saying a number. The first player says "1" and each
          player in turn increases the number by 1, 2, or 3, but may not exceed
          21; the player forced to say "21", or any greater value, loses.
        </p>
        {this.buttonDisplay(this.state.gameOver)}
      </div>
    )
  }

  async getNim(choice = 0) {
    if (!this.state.playerTurn) {
      return
    }

    this.setState({
      playerTurn: !this.state.playerTurn,
      choice,
      total: this.state.total + choice,
    })

    const response = await fetch("api/nimgame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ total: this.state.total + choice }),
    })
    const data = await response.json()
    setTimeout(() => {
      this.setState({
        ...data,
      })
    }, 1500)
  }
}
