import { withTools } from '../../src'

const mountedComponents = new Set()

function mount(node) {
  const rootNode = document.body.appendChild(document.createElement('div'))
  mountedComponents.add(rootNode)

  rootNode.innerHTML = node

  return withTools(rootNode)
}

function unmount() {
  mountedComponents.forEach(component => {
    if (document.body.contains(component)) {
      document.body.removeChild(component)
    }

    mountedComponents.delete(component)
  })
}

export { mount, unmount }