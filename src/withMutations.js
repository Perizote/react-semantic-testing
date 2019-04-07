import 'mutationobserver-shim'

import { withQueries, lastQuery } from './withQueries'
import { withEvents } from './withEvents'
import { withHelpers } from './withHelpers'

async function createMutationObserver(callback, { timeout = 3000, node, error } = {}) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(onTimeout, timeout)
    const mutationObserver = new MutationObserver(onMutation)
    mutationObserver.observe(node, { attributes: true, childList: true, characterData: true, subtree: true })

    function onTimeout() {
      finish()
      reject(error)
    }

    function onMutation(mutations) {
      const result = callback(mutations)
      finish()
      resolve(result)
    }

    function finish() {
      clearTimeout(timeoutId)
      mutationObserver.disconnect()
    }
  })
}

const withTools = (node) => ({
  ...withEvents(node),
  ...withHelpers(node),
  ...withQueries(node),
})

function withMutations (node) {
  return {
    async waitUntilItChanges() {
      const onChange = () => withTools(node)

      return createMutationObserver(onChange, {
        node,
        error: 'Timeout waiting for node to change',
      })
    },
    async waitUntilItAppears() {
      const onRender = () => {
        const renderedNode = lastQuery().getRawNode()

        if (!renderedNode) { return }

        return withTools(renderedNode)
      }

      return createMutationObserver(onRender, {
        node: document,
        error: 'Timeout waiting for node to render',
      })
    },
    async waitUntilItDisappears() {
      const onDisappear = mutations => {
        const hasBeenDisappeared = mutations
          .filter(({ removedNodes }) => removedNodes.length > 0)
          .map(({ removedNodes }) => removedNodes)
          .flat()
          .some(removedNode => removedNode.isSameNode(node))

        if (!hasBeenDisappeared) { return }

        return withTools(node)
      }

      return createMutationObserver(onDisappear, {
        node: node.parentNode,
        error: 'Timeout waiting for node to disappear',
      })
    }
  }
}

export { withMutations }