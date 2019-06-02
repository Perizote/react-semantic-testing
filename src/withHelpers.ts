import prettyFormat from 'pretty-format'

function withHelpers(node) {
  return {
    getRawNode() {
      return node
    },
    getText() {
      return node.textContent
    },
    getValue() {
      return node.value
    },
    logTree(options) {
      const { DOMElement, DOMCollection } = prettyFormat.plugins
      const tree = prettyFormat(node, {
        plugins: [ DOMElement, DOMCollection ],
        printFunctionName: false,
        highlight: true,
        ...options,
      })

      console.log(tree)
    },
  }
}

export { withHelpers }