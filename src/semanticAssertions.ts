import {
  includesText,
  trimAndCollapseText,
  getTextComparator,
  getValueComparator,
  TextMatcher
} from './utils/matchers'
import { SemanticNode } from './withSemantic'
import { DOMNode, DOMNodeList, DOMAttribute } from './utils/DOMNode'

type Matcher = {
  message: string,
  pass: boolean,
}

const buildPassingMatcher = (message: string): Matcher => ({
  message,
  pass: true,
})

const buildFailingMatcher = (message: string): Matcher => ({
  message,
  pass: false,
})

const semanticAssertions = {
  toBeRendered(node: SemanticNode): Matcher {
    return document.body.contains(node.getRawNode())
      ? buildPassingMatcher('expected node not to be rendered')
      : buildFailingMatcher('expected node to be rendered')
  },
  toHaveText(node: SemanticNode, text: TextMatcher): Matcher {
    const nodeText = node.getText() || ''
    const includesAria = (rawNode: DOMNode): boolean =>
      ([ ...rawNode.querySelectorAll(`[${ DOMAttribute.AriaLabel }], [${ DOMAttribute.Alt }]`) ] as DOMNodeList)
        .some(getTextComparator(text))

    return includesText(text, nodeText) ||includesAria(node.getRawNode())
      ? buildPassingMatcher(`expected node not to have text "${ text }" but actually does`)
      : buildFailingMatcher(`expected node to have text "${ text }" but instead has "${ trimAndCollapseText(nodeText) }"`)
  },
  toBeDisabled(node: SemanticNode): Matcher {
    return node.getRawNode().disabled
      ? buildPassingMatcher('expected node not to be disabled')
      : buildFailingMatcher('expected node to be disabled')
  },
  toHaveValue(node: SemanticNode, value: TextMatcher): Matcher {
    const isInCurrentNode = getValueComparator(value)

    return isInCurrentNode(node.getRawNode())
      ? buildPassingMatcher(`expected node not to have value "${ value }" but actually does`)
      : buildFailingMatcher(`expected node to have value "${ value }" but instead has "${ node.getValue() }"`)
  },
  toBeChecked(node: SemanticNode): Matcher {
    return node.getRawNode().checked
      ? buildPassingMatcher('expected node not to be checked')
      : buildFailingMatcher('expected node to be checked')
  },
  toHaveFocus(node: SemanticNode): Matcher {
    const documentNode = node.getRawNode().ownerDocument
    const hasFocus = documentNode && documentNode.activeElement === node.getRawNode()

    return hasFocus
      ? buildPassingMatcher('expected node not to have focus')
      : buildFailingMatcher('expected node to have focus')
  },
}

export { semanticAssertions }