import {
  includesText,
  trimAndCollapseText,
  getTextComparator,
  getValueComparator,
  TextMatcher
} from './utils/matchers'
import { NodeWithEvents } from './withEvents'
import { NodeWithQueries } from './withQueries'
import { NodeWithHelpers } from './withHelpers'
import { NodeWithMutations } from './withMutations'
import { DOMNode, DOMNodeList, DOMAttribute } from './utils/DOMNode'

type Matcher = {
  message: () => string,
  pass: boolean,
}
type NodeContainingTools = NodeWithEvents & NodeWithQueries & NodeWithHelpers & NodeWithMutations

const buildPassingMatcher = (message: string): Matcher => ({
  message: () => message,
  pass: true,
})

const buildFailingMatcher = (message: string): Matcher => ({
  message: () => message,
  pass: false,
})

const assertions = {
  toBeRendered(node: NodeContainingTools): Matcher {
    return document.body.contains(node.getRawNode())
      ? buildPassingMatcher('expected node not to be rendered')
      : buildFailingMatcher('expected node to be rendered')
  },
  toHaveText(node: NodeContainingTools, text: TextMatcher): Matcher {
    const nodeText = node.getText() || ''
    const includesAria = (rawNode: DOMNode): boolean =>
      ([ ...rawNode.querySelectorAll(`[${ DOMAttribute.AriaLabel }], [${ DOMAttribute.Alt }]`) ] as DOMNodeList)
        .some(getTextComparator(text))

    return includesText(text, nodeText) ||includesAria(node.getRawNode())
      ? buildPassingMatcher(`expected node not to have text "${ text }" but actually does`)
      : buildFailingMatcher(`expected node to have text "${ text }" but instead has "${ trimAndCollapseText(nodeText) }"`)
  },
  toBeDisabled(node: NodeContainingTools): Matcher {
    return node.getRawNode().disabled
      ? buildPassingMatcher('expected node not to be disabled')
      : buildFailingMatcher('expected node to be disabled')
  },
  toHaveValue(node: NodeContainingTools, value: TextMatcher): Matcher {
    const isInCurrentNode = getValueComparator(value)

    return isInCurrentNode(node.getRawNode())
      ? buildPassingMatcher(`expected node not to have value "${ value }" but actually does`)
      : buildFailingMatcher(`expected node to have value "${ value }" but instead has "${ node.getValue() }"`)
  },
  toBeChecked(node: NodeContainingTools): Matcher {
    return node.getRawNode().checked
      ? buildPassingMatcher('expected node not to be checked')
      : buildFailingMatcher('expected node to be checked')
  },
  toHaveFocus(node: NodeContainingTools): Matcher {
    const documentNode = node.getRawNode().ownerDocument
    const hasFocus = documentNode && documentNode.activeElement === node.getRawNode()

    return hasFocus
      ? buildPassingMatcher('expected node not to have focus')
      : buildFailingMatcher('expected node to have focus')
  },
}

export { assertions }