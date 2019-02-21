import { unmountComponentAtNode } from 'react-dom'

import { observeChanges, observeNewRenders } from './mutationObserver'

function withTools(node, lastQuery) {
  return {
    unmount() {
      unmountComponentAtNode(node) // TODO: Make it generic
      document.body.removeChild(node)
    },
    getRawNode() {
      return node
    },
    getByDataTest(dataTest) {
      const lastQuery = () => this.getByDataTest(dataTest)
      return withTools(node.querySelector(`[data-test="${ dataTest }"]`), lastQuery)
    },
    getText() {
      return node.textContent
    },
    getTree() {
      return node.innerHTML
    },
    click() {
      const WindowEvent = document.defaultView.Event
      const event = new WindowEvent('click', { bubbles: true, cancelable: true, button: 0 })
      node.dispatchEvent(event)
    },
    async willChange() {
      const onChange = () => withTools(node, lastQuery)

      return observeChanges(onChange, node)
    },
    async willRender() {
      const onRender = () => {
        const lastNode = lastQuery().getRawNode()

        if (!lastNode) { return }

        return withTools(lastNode, lastQuery)
      }

      return observeNewRenders(onRender)
    }
  }
}

export { withTools }