import React, { Component, Fragment } from 'react'

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
      <Fragment>
        <button onClick={ this.remove }>-</button>
        <span data-test="products">{ this.state.products }</span>
        <button onClick={ this.add }>+</button>
      </Fragment>
    )
  }
}