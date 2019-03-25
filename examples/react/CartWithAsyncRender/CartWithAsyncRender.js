import React, { Component } from 'react'

export class CartWithAsyncRender extends Component {
  state = {
    products: 10,
    isLoading: false,
  }

  componentDidMount = () =>  {
    this.setFakeLoading()
  }

  setFakeLoading = () =>  {
    this.setState({ isLoading: true })
    setTimeout(() => this.setState({ isLoading: false }), 100)
  }

  add = () => {
    this.setState({ products: this.state.products + 1 })
  }

  remove = () => {
    this.setState({ products: this.state.products - 1 })
  }

  render() {
    const { isLoading, products } = this.state

    if (isLoading) { return <span>loading</span> }

    return (
      <div data-test="cart">
        <button data-test="remove" onClick={ this.remove }>-</button>
        <span data-test="products">{ products }</span>
        <button data-test="add" onClick={ this.add }>+</button>
      </div>
    )
  }
}