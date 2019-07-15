import { act } from 'react-dom/test-utils'
import 'mutationobserver-shim'

import {
  getSemanticQueries,
  lastQuery,
  SemanticQueries,
  QueryResult,
  QueryForNodeListResult,
  QueryForSingleNodeResult,
} from './getSemanticQueries'
import { getSemanticEvents, SemanticEvents } from './getSemanticEvents'
import { getSemanticHelpers, SemanticHelpers } from './getSemanticHelpers'
import { DOMNode } from './utils/DOMNode'

type Callback = (mutations: MutationRecord[]) => any
type Options = {
  timeout?: number,
  node: DOMNode,
  error: string,
}
type SemanticNodeWithoutMutations = SemanticQueries & SemanticEvents & SemanticHelpers
type SemanticMutations = {
  waitUntilItChanges: () => Promise<SemanticNodeWithoutMutations>,
  waitUntilItAppears: () => Promise<QueryResult | void>,
  waitUntilItDisappears: (mutations: MutationRecord[]) => Promise<void | SemanticNodeWithoutMutations>,
}

const createMutationObserver = async (callback: Callback, options: Options): Promise<any> => {
  let mutationObserver
  // @ts-ignore
  await act(async () => {
    mutationObserver = await new Promise((resolve, reject) => {
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
  })

  return mutationObserver
}

const withSemantic = (node: DOMNode): SemanticNodeWithoutMutations => ({
  ...getSemanticEvents(node),
  ...getSemanticHelpers(node),
  ...getSemanticQueries(node),
})

const getSemanticMutations = (node: DOMNode): SemanticMutations => ({
  async waitUntilItChanges(): Promise<SemanticNodeWithoutMutations> {
    const onChange = (): SemanticNodeWithoutMutations => withSemantic(node)
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
  async waitUntilItDisappears(): Promise<void | SemanticNodeWithoutMutations> {
    const onDisappear = (mutations: MutationRecord[]): void | SemanticNodeWithoutMutations => {
      const hasBeenDisappeared = mutations
        .filter(({ removedNodes }) => removedNodes.length > 0)
        .map(({ removedNodes }) => removedNodes)
        .flat()
        .some(removedNode => removedNode.isSameNode(node))

      if (!hasBeenDisappeared) { return }

      return withSemantic(node)
    }
    const options = {
      node: (node.parentNode as DOMNode) || document,
      error: 'Timeout waiting for node to disappear',
    }

    return createMutationObserver(onDisappear, options)
  }
})

export { getSemanticMutations, SemanticMutations }