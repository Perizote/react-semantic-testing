import React from 'react'

import { Portal } from './Portal'
import { mount } from '../mount'
import { withTools } from '../../../src'

describe('portal', () => {
  it('should render content in a different location', () => {
    const domNode = document.createElement('div')
    const childrenText = 'I am a portal'
    const portal = mount(<Portal domNode={ domNode }><p>{ childrenText }</p></Portal>)
    const portalRoot = withTools(domNode)

    expect(portal).toBeRendered()
    expect(portal).not.toHaveText(childrenText)
    expect(portalRoot).toHaveText(childrenText)
    portal.unmount()
  })
})