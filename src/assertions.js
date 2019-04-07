import { compareText } from './compareText'

function buildPassingMatcher(message) {
  return {
    message: () => message,
    pass: true,
  }
}

function buildFailingMatcher(message) {
  return {
    message: () => message,
    pass: false,
  }
}

const assertions = {
  toBeRendered(node) {
    return document.body.contains(node.getRawNode())
      ? buildPassingMatcher('expected node not to be rendered')
      : buildFailingMatcher('expected node to be rendered')
  },
  toHaveText(node, text) {
    return compareText(text, node.getText())
      ? buildPassingMatcher(`expected node not to have text "${ text }" but actually does`)
      : buildFailingMatcher(`expected node to have text "${ text }" but instead has "${ node.getText().trim() }"`)
  },
  toBeDisabled(node) {
    return node.getRawNode().disabled
      ? buildPassingMatcher('expected node not to be disabled')
      : buildFailingMatcher('expected node to be disabled')
  },
  toHaveValue(node, value) {
    return compareText(value, node.getValue())
      ? buildPassingMatcher(`expected node not to have value "${ value }" but actually does`)
      : buildFailingMatcher(`expected node to have value "${ value }" but instead has "${ node.getValue() }"`)
  },
}

export { assertions }