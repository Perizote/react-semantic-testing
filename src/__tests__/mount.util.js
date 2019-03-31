import { withTools } from '../../src'

function mount(node) {
  const rootNode = document.body.appendChild(document.createElement('div'))

  rootNode.innerHTML = node

  return withTools(rootNode)
}

export { mount }