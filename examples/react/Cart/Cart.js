import React, { Component } from 'react'

export class Cart extends Component {
  state = {
    products: 10,
  }

  add = () => {
    this.setState({ products: this.state.products + 1 })
  }

  remove = () => {
    this.setState({ products: this.state.products - 1 })
  }

  render = () => {
    return (
      <div data-test="cart">
        <button data-test="remove" onClick={ this.remove }>-</button>
        <span data-test="products">{ this.state.products }</span>
        <button data-test="add" onClick={ this.add }>+</button>
      </div>
    )
  }
}