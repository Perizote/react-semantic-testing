import React, { Component } from 'react'
import { createPortal } from 'react-dom'

class Portal extends Component {
  componentDidMount = () => {
    document.body.appendChild(this.props.portalRoot)
  }

  componentWillUnmount = () => {
    document.body.removeChild(this.props.portalRoot)
  }

  render = () => {
    return createPortal(
      this.props.children,
      this.props.portalRoot,
    )
  }
}

export { Portal }