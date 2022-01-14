import React, { Component } from "react"

export class Nim extends Component {
  static displayName = Nim.name

  constructor(props) {
    super(props)
    this.state = { nim: 0, loading: true }
  }

  componentDidMount() {
    this.getNim()
  }

  static renderNim(nim) {
    return <em>{nim}</em>
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      Nim.renderNim(this.state.nim)
    )

    return (
      <div>
        <div>{contents}</div>

        <button
          className="btn btn-primary"
          onClick={() => this.getNim(this.state.nim + 1)}
        >
          1
        </button>
        <button
          className="btn btn-primary"
          onClick={() => this.getNim(this.state.nim + 2)}
        >
          2
        </button>
        <button
          className="btn btn-primary"
          onClick={() => this.getNim(this.state.nim + 3)}
        >
          3
        </button>
      </div>
    )
  }

  async getNim(nim = 0) {
    const response = await fetch("api/nimgame", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ nim }),
    })
    const data = await response.json()
    this.setState({ ...data, loading: false })
  }
}
