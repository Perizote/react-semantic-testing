import React, { Component } from 'react'

export class CartWithAsyncState extends Component {
  state = {
    products: 0,
    isLoading: false,
  }

  componentDidMount = async () =>  {
    this.setState({ isLoading: true })
    const initialCount = await this.getInitialProducts()

    this.setState({ products: initialCount, isLoading: false })
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

  render() {
    return (
      <div data-test="cart">
        { !this.state.isLoading && <button data-test="remove" onClick={ this.remove }>-</button> }
        <span data-test="products">{ this.state.products }</span>
        <button data-test="add" onClick={ this.add }>+</button>
      </div>
    )
  }
}