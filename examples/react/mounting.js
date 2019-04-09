import { render, unmountComponentAtNode } from 'react-dom'

import { withTools } from '../../src'

const mountedComponents = new Set()

function mount(component) {
  const rootNode = document.body.appendChild(document.createElement('div'))
  mountedComponents.add(rootNode)

  render(component, rootNode)

  return withTools(rootNode)
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

export { mount, unmount }