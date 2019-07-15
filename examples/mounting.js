import React, { createContext } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { mount } from 'react-semantic-testing'

function mountWithRedux(component, { initialState, reducer } = {}) {
  const store = createStore(reducer, initialState)

  return mount(
    <Provider store={ store }>
      { component }
    </Provider>
  )
}

function mountWithRouter(component, { route = '/' } = {}) {
  const history = createMemoryHistory({ initialEntries: [ route ] })

  return mount(
    <Router history={ history }>
      { component }
    </Router>
  )
}

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

export { mountWithRedux, mountWithRouter, mountWithContext }