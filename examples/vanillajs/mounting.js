import { withTools } from 'react-semantic-testing'

const mountedComponents = new Set()

function mount(component) {
  const rootNode = document.body.appendChild(document.createElement('div'))
  mountedComponents.add(rootNode)

  component(rootNode)

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