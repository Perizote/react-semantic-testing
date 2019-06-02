import React, { createContext } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { withEvents, withQueries, withHelpers, withMutations } from 'aguacatest'

const mountedComponents = new Set()

const withExtendedToolsForReact = node => ({
  ...extendEvents(withEvents(node)),
  ...withQueries(node),
  ...withHelpers(node),
  ...extendMutations(withMutations(node)),
})

const extendEvents = events => {
  return Object.keys(events).reduce((accEvents, eventName) => {
    const event = events[eventName]

    return {
      ...accEvents,
      [eventName]: (...args) => {
        let result

        act(() => {
          result = event(...args)
        })

        return result
      },
    }
  }, {})
}

const extendMutations = mutations => {
  return Object.keys(mutations).reduce((accMutations, mutationName) => {
    const mutation = mutations[mutationName]

    return {
      ...accMutations,
      [mutationName]: async (...args) => {
        let result

        await act(async () => {
          result = await mutation(...args)
        })

        return result
      },
    }
  }, {})
}

function mount(component) {
  const rootNode = document.body.appendChild(document.createElement('div'))
  mountedComponents.add(rootNode)

  act(() => {
    render(component, rootNode)
  })

  return withExtendedToolsForReact(rootNode)
}

function mountWithRedux(component, { initialState, reducer } = {}) {
  const store = createStore(reducer, initialState)

  return mount(
    <Provider store={ store }>
      { component }
    </Provider>
  )
}

function mountWithRouter(component, { route = '/', initialEntries } = {}) {
  const history = createMemoryHistory({ initialEntries: [route] })

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
    return mount(
      <Consumer>
        { component }
      </Consumer>
    )
  }

  if (!useConsumer) {
    return mount(
      <Provider value={ value }>
        { component }
      </Provider>
    )
  }

  return mount(
    <Provider value={ value }>
      <Consumer>
        { component }
      </Consumer>
    </Provider>
  )
}

function unmount() {
  mountedComponents.forEach(component => {
    if (document.body.contains(component)) {
      document.body.removeChild(component)
    }

    unmountComponentAtNode(component)
    mountedComponents.delete(component)
  })
}

export { mount, mountWithRedux, mountWithRouter, mountWithContext, unmount }