import { unmountComponentAtNode } from 'react-dom'

import { observeChanges, observeNewRenders } from './mutationObserver'
import { getDispatchableEvents } from './getDispatchableEvents'

function withTools(node, lastQuery) {
  return {
    unmount() {
      unmountComponentAtNode(node)
      document.body.removeChild(node)
    },
    getRawNode() {
      return node
    },
    getByDataTest(dataTest) {
      const lastQuery = () => this.getByDataTest(dataTest)
      const { unmount, ...restOfTools } = withTools(node.querySelector(`[data-test="${ dataTest }"]`), lastQuery)
      return restOfTools
    },
    getText() {
      return node.textContent
    },
    getTree() {
      return node.innerHTML
    },
    ...getDispatchableEvents(node),
    async willChange() {
      const onChange = () => {
        const { unmount, willChange, willRender, ...restOfTools } = withTools(node, lastQuery)
        return restOfTools
      }

      return observeChanges(onChange, node)
    },
    async willRender() {
      const onRender = () => {
        const lastNode = lastQuery().getRawNode()

        if (!lastNode) { return }

        const { unmount, willChange, willRender, ...restOfTools } = withTools(lastNode, lastQuery)
        return restOfTools
      }

      return observeNewRenders(onRender)
    }
  }
}

export { withTools }