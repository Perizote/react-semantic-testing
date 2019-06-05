import 'mutationobserver-shim'

import {
  withQueries,
  lastQuery,
  NodeWithQueries,
  QueryResult,
  QueryForNodeListResult,
  QueryForSingleNodeResult,
} from './withQueries'
import { withEvents, NodeWithEvents } from './withEvents'
import { withHelpers, NodeWithHelpers } from './withHelpers'
import { DOMNode } from './utils/DOMNode'

type Callback = (mutations: MutationRecord[]) => any
type Options = {
  timeout?: number,
  node: DOMNode,
  error: string,
}
type NodeWithToolsWithoutMutations = NodeWithQueries & NodeWithEvents & NodeWithHelpers
type NodeWithMutations = {
  waitUntilItChanges: () => Promise<NodeWithToolsWithoutMutations>,
  waitUntilItAppears: () => Promise<QueryResult | void>,
  waitUntilItDisappears: (mutations: MutationRecord[]) => Promise<void | NodeWithToolsWithoutMutations>,
}

const createMutationObserver = async (callback: Callback, options: Options): Promise<any> => (
  new Promise((resolve, reject) => {
    const { timeout = 3000, node, error } = options
    const timeoutId = setTimeout(onTimeout, timeout)
    const mutationObserver = new MutationObserver(onMutation)
    mutationObserver.observe(node, { attributes: true, childList: true, characterData: true, subtree: true })

    function onTimeout(): void {
      finish()
      reject(error)
    }

    function onMutation(mutations: MutationRecord[]): void {
      const result = callback(mutations)
      finish()
      resolve(result)
    }

    function finish(): void {
      clearTimeout(timeoutId)
      mutationObserver.disconnect()
    }
  })
)

const withTools = (node: DOMNode): NodeWithToolsWithoutMutations => ({
  ...withEvents(node),
  ...withHelpers(node),
  ...withQueries(node),
})

const withMutations = (node: DOMNode): NodeWithMutations => ({
  async waitUntilItChanges(): Promise<NodeWithToolsWithoutMutations> {
    const onChange = (): NodeWithToolsWithoutMutations => withTools(node)
    const options = {
      node,
      error: 'Timeout waiting for node to change',
    }

    return createMutationObserver(onChange, options)
  },
  async waitUntilItAppears(): Promise<QueryResult | void> {
    const onRender = (): QueryResult | void => {
      const renderedNodes = lastQuery()

      if ((renderedNodes as QueryForNodeListResult).length > 0) {
        return renderedNodes
      }

      if (!(renderedNodes as QueryForSingleNodeResult).getRawNode()) { return }

      return renderedNodes
    }
    const options = {
      node: (document as DOMNode),
      error: 'Timeout waiting for node to render',
    }

    return createMutationObserver(onRender, options)
  },
  async waitUntilItDisappears(): Promise<void | NodeWithToolsWithoutMutations> {
    const onDisappear = (mutations: MutationRecord[]): void | NodeWithToolsWithoutMutations => {
      const hasBeenDisappeared = mutations
        .filter(({ removedNodes }) => removedNodes.length > 0)
        .map(({ removedNodes }) => removedNodes)
        .flat()
        .some(removedNode => removedNode.isSameNode(node))

      if (!hasBeenDisappeared) { return }

      return withTools(node)
    }
    const options = {
      node: (node.parentNode as DOMNode) || document,
      error: 'Timeout waiting for node to disappear',
    }

    return createMutationObserver(onDisappear, options)
  }
})

export { withMutations, NodeWithMutations }