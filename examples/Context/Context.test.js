import React, { createContext } from 'react'
import { mount } from 'react-semantic-testing'

function mountWithContext(
  component,
  { defaultValue, value = defaultValue, useProvider = true, useConsumer = true } = {}
) {
  const { Provider, Consumer } = createContext(defaultValue)

  if (!useProvider) {
    return mount(<Consumer>{ component }</Consumer>)
  }

  if (!useConsumer) {
    return mount(<Provider value={ value }>{ component }</Provider>)
  }

  return mount(
    <Provider value={ value }>
      <Consumer>
        { component }
      </Consumer>
    </Provider>
  )
}

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