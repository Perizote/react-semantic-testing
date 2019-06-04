import 'mutationobserver-shim'

import { withQueries, lastQuery, NodeWithQueries } from './withQueries'
import { withEvents, NodeWithEvents } from './withEvents'
import { withHelpers, NodeWithHelpers } from './withHelpers'

type Callback = (mutations: Array<MutationRecord>) => any
type Options = {
  timeout?: number,
  node: Node,
  error: string,
}
type NodeWithToolsWithoutMutations = NodeWithQueries & NodeWithEvents & NodeWithHelpers
type NodeWithMutations = {
  waitUntilItChanges: () => Promise<undefined | NodeWithToolsWithoutMutations>,
  waitUntilItAppears: () => Promise<Array<NodeWithToolsWithoutMutations> | undefined | NodeWithToolsWithoutMutations>,
  waitUntilItDisappears: (mutations: Array<MutationRecord>) => Promise<undefined | NodeWithToolsWithoutMutations>,
}
type HTMLElementWithValue =
  | HTMLButtonElement
  | HTMLDataElement
  | HTMLInputElement
  | HTMLLIElement
  | HTMLMeterElement
  | HTMLOptionElement
  | HTMLProgressElement
  | HTMLParamElement

const createMutationObserver = async (callback: Callback, options: Options): Promise<undefined | NodeWithToolsWithoutMutations> => (
  new Promise((resolve, reject) => {
    const { timeout = 3000, node, error } = options
    const timeoutId = setTimeout(onTimeout, timeout)
    const mutationObserver = new MutationObserver(onMutation)
    mutationObserver.observe(node, { attributes: true, childList: true, characterData: true, subtree: true })

    function onTimeout(): void {
      finish()
      reject(error)
    }

    function onMutation(mutations: Array<MutationRecord>): void {
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

const withTools = (node: Node & HTMLElementWithValue): NodeWithToolsWithoutMutations => ({
  ...withEvents(node),
  ...withHelpers(node),
  ...withQueries(node),
})

const withMutations = (node: Node & HTMLElementWithValue): NodeWithToolsWithoutMutations => ({
  async waitUntilItChanges(): Promise<NodeWithToolsWithoutMutations> {
    const onChange = (): NodeWithToolsWithoutMutations => withTools(node)
    const options = {
      node,
      error: 'Timeout waiting for node to change',
    }

    return createMutationObserver(onChange, options)
  },
  async waitUntilItAppears(): Promise<Array<NodeWithToolsWithoutMutations> | undefined | NodeWithToolsWithoutMutations> {
    const onRender = (): Array<NodeWithToolsWithoutMutations> | undefined | NodeWithToolsWithoutMutations => {
      const renderedNodes = lastQuery()

      if (renderedNodes.length > 0) {
        return renderedNodes
      }

      if (!renderedNodes.getRawNode()) { return }

      return renderedNodes
    }
    const options = {
      node: document,
      error: 'Timeout waiting for node to render',
    }

    return createMutationObserver(onRender, options)
  },
  async waitUntilItDisappears(): Promise<undefined | NodeWithToolsWithoutMutations> {
    const onDisappear = (mutations: Array<MutationRecord>): undefined | NodeWithToolsWithoutMutations => {
      const hasBeenDisappeared = mutations
        .filter(({ removedNodes }) => removedNodes.length > 0)
        .map(({ removedNodes }) => removedNodes)
        .flat()
        .some(removedNode => removedNode.isSameNode(node))

      if (!hasBeenDisappeared) { return }

      return withTools(node)
    }
    const options = {
      node: node.parentNode || document,
      error: 'Timeout waiting for node to disappear',
    }

    return createMutationObserver(onDisappear, options)
  }
})

export { withMutations, NodeWithMutations }