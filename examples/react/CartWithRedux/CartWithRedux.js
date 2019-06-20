import React, { Component, Fragment } from 'react'
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
      <Fragment>
        <button onClick={ this.remove }>-</button>
        <span data-test="products">{ this.props.products }</span>
        <button onClick={ this.add }>+</button>
      </Fragment>
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