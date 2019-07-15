import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { withSemantic, SemanticNode } from './withSemantic'
import { DOMNode } from './utils/DOMNode'

const mountedComponents: Set<HTMLElement> = new Set()

function mount(component: JSX.Element): SemanticNode {
  const rootNode = document.body.appendChild(document.createElement('div'))
  mountedComponents.add(rootNode)

  act(() => {
    render(component, rootNode)
  })

  return withSemantic(rootNode as DOMNode)
}

function unmount() {
  mountedComponents.forEach((component: HTMLElement) => {
    if (document.body.contains(component)) {
      document.body.removeChild(component)
    }

    unmountComponentAtNode(component)
    mountedComponents.delete(component)
  })
}

export { mount, unmount }