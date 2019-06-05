import { withTools, NodeWithTools } from '../src/withTools'
import { DOMNode } from '../src/utils/DOMNode'

const mountedComponents = new Set()

function mount(node: string): NodeWithTools {
  const rootNode = document.body.appendChild(document.createElement('div')) as DOMNode
  mountedComponents.add(rootNode)

  rootNode.innerHTML = node

  return withTools(rootNode)
}

function unmount(): void {
  mountedComponents.forEach(component => {
    if (document.body.contains(component)) {
      document.body.removeChild(component)
    }

    mountedComponents.delete(component)
  })
}

export { mount, unmount }