import React, { Component } from 'react'
import { createPortal } from 'react-dom'

class Portal extends Component {
  componentDidMount = () => {
    document.body.appendChild(this.props.domNode)
  }

  componentWillUnmount = () => {
    document.body.removeChild(this.props.domNode)
  }

  render = () => {
    return createPortal(
      this.props.children,
      this.props.domNode,
    )
  }
}

export { Portal }