import { render } from 'react-dom'

import { withTools } from '../../src'

function mount(component) {
  const rootNode = document.body.appendChild(document.createElement('div'))

  render(component, rootNode)

  return withTools(rootNode)
}

export { mount }