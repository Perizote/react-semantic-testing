import React, { Component, Fragment } from 'react'

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
    this.setState(({ products }) => ({ products: products + 1 }))
  }

  remove = () => {
    this.setState(({ products }) => ({ products: products - 1 }))
  }

  render = () => {
    const { isLoading, products } = this.state

    if (isLoading) { return <span>loading</span> }

    return (
      <Fragment>
        <button onClick={ this.remove }>-</button>
        <span data-test="products">{ products }</span>
        <button onClick={ this.add }>+</button>
      </Fragment>
    )
  }
}