import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { withTools } from 'dom-test-tools'

const mountedComponents = new Set()

function mount(component) {
  const rootNode = document.body.appendChild(document.createElement('div'))
  mountedComponents.add(rootNode)

  act(() => {
    render(component, rootNode)
  })

  return {
    ...withTools(rootNode),
    getRootNode() {
      return withTools(rootNode)
    },
  }
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

function unmount() {
  mountedComponents.forEach(component => {
    if (document.body.contains(component)) {
      document.body.removeChild(component)
    }

    unmountComponentAtNode(component)
    mountedComponents.delete(component)
  })
}

export { mount, mountWithRedux, mountWithRouter, unmount }