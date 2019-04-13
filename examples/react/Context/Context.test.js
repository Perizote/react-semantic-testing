import React from 'react'

import { mountWithContext, unmount } from '../mounting'

describe('context', () => {
  const withTheme = theme => <p>Applied theme: { theme }</p>
  const defaultValue = 'light'

  it('should have the default value', () => {
    const themeWithContext = mountWithContext(withTheme, { defaultValue, useProvider: false })

    expect(themeWithContext).toHaveText(`Applied theme: ${ defaultValue }`)
  })

  it('should have the value of the provider', () => {
    const value = 'dark'

    const themeWithContext = mountWithContext(withTheme, { defaultValue, value })

    expect(themeWithContext).toHaveText(`Applied theme: ${ value }`)
  })
})