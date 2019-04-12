import React, { Component } from 'react'
import { number } from 'prop-types'
import { connect } from 'react-redux'

import { add, remove } from './reduxStuff'

class CartWithRedux extends Component {
  static propTypes = {
    products: number.isRequired,
  }

  add = () => {
    this.props.add()
  }

  remove = () => {
    this.props.remove()
  }

  render = () => {
    return (
      <div data-test="cart">
        <button data-test="remove" onClick={ this.remove }>-</button>
        <span data-test="products">{ this.props.products }</span>
        <button data-test="add" onClick={ this.add }>+</button>
      </div>
    )
  }
}

const mapStateToProps = ({ products }) => ({ products })
const mapDispatchToProps = dispatch => ({
  add: () => dispatch(add()),
  remove: () => dispatch(remove()),
})

const ConnectedCartWithRedux = connect(mapStateToProps, mapDispatchToProps)(CartWithRedux)

export { ConnectedCartWithRedux as CartWithRedux }