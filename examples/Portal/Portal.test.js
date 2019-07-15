import React from 'react'
import { mount, unmount } from 'react-semantic-testing'

import { Portal } from './Portal'

describe('portal', () => {
  it('should render content in a different location', () => {
    const portalRoot = document.createElement('div')
    const childrenText = 'I am a portal'
    const portal = mount(<Portal portalRoot={ portalRoot }><p>{ childrenText }</p></Portal>)

    expect(portal).toBeRendered()
    expect(portal).not.toHaveText(childrenText)
    expect(portalRoot.textContent).toBe(childrenText)
    unmount()
  })
})