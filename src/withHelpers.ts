import prettyFormat from 'pretty-format'
import { DOMNode } from './utils/DOMNode'

type NodeWithHelpers = {
  getRawNode: () => DOMNode,
  getText: () => string | null,
  getValue: () => string | number | undefined,
  logTree: (options: object) => void,
}

const withHelpers = (node: DOMNode): NodeWithHelpers => ({
  getRawNode(): DOMNode {
    return node
  },
  getText(): string | null {
    return node.textContent
  },
  getValue(): string | number | undefined {
    return node.value
  },
  logTree(options: object): void {
    const { DOMElement, DOMCollection } = prettyFormat.plugins
    const tree = prettyFormat(node, {
      plugins: [ DOMElement, DOMCollection ],
      printFunctionName: false,
      highlight: true,
      ...options,
    })

    console.log(tree)
  },
})

export { withHelpers, NodeWithHelpers }