import { getTextComparator, getMultipleTextComparator, getValueComparator } from './utils'

const buildPassingMatcher = message => ({
  message: () => message,
  pass: true,
})

const buildFailingMatcher = message => ({
  message: () => message,
  pass: false,
})

const assertions = {
  toBeRendered(node) {
    return document.body.contains(node.getRawNode())
      ? buildPassingMatcher('expected node not to be rendered')
      : buildFailingMatcher('expected node to be rendered')
  },
  toHaveText(node, text) {
    const isInAChildNode = (text, node) => [ ...node.querySelectorAll('*') ].some(getMultipleTextComparator(text))
    const isInCurrentNode = getTextComparator(text)

    return isInCurrentNode(node.getRawNode()) || isInAChildNode(text, node.getRawNode())
      ? buildPassingMatcher(`expected node not to have text "${ text }" but actually does`)
      : buildFailingMatcher(`expected node to have text "${ text }" but instead has "${ node.getText().trim() }"`)
  },
  toBeDisabled(node) {
    return node.getRawNode().disabled
      ? buildPassingMatcher('expected node not to be disabled')
      : buildFailingMatcher('expected node to be disabled')
  },
  toHaveValue(node, value) {
    const isInCurrentNode = getValueComparator(value)

    return isInCurrentNode(node.getRawNode())
      ? buildPassingMatcher(`expected node not to have value "${ value }" but actually does`)
      : buildFailingMatcher(`expected node to have value "${ value }" but instead has "${ node.getValue() }"`)
  },
  toBeChecked(node) {
    return node.getRawNode().checked
      ? buildPassingMatcher('expected node not to be checked')
      : buildFailingMatcher('expected node to be checked')
  },
}

export { assertions }