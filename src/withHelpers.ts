import prettyFormat from 'pretty-format'

type HTMLElementWithValue =
  | HTMLButtonElement
  | HTMLDataElement
  | HTMLInputElement
  | HTMLLIElement
  | HTMLMeterElement
  | HTMLOptionElement
  | HTMLProgressElement
  | HTMLParamElement

type NodeWithHelpers = {
  getRawNode: () => Node,
  getText: () => string | null,
  getValue: () => string | number | undefined,
  logTree: (options: object) => void,
}

const withHelpers = (node: Node & HTMLElementWithValue): NodeWithHelpers => ({
  getRawNode(): Node {
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

export { withHelpers }