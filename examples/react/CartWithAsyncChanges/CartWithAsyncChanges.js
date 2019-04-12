import React, { Component } from 'react'

export class CartWithAsyncChanges extends Component {
  state = {
    products: 0,
  }

  componentDidMount = async () =>  {
    const products = await this.getInitialProducts()

    this.setState({ products })
  }

  getInitialProducts = async () =>  {
    return new Promise(resolve => setTimeout(() => resolve(10), 100))
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