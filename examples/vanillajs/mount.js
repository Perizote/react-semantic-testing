import { withTools } from '../../src'

function mount(component) {
  const rootNode = document.body.appendChild(document.createElement('div'))

  component(rootNode)

  return withTools(rootNode)
}

export { mount }