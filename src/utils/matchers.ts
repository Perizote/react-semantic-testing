import { DOMNode, DOMAttribute } from './DOMNode'

type TextMatcher = undefined | string | number | RegExp

const compareText = (text: TextMatcher, textToCompare: string): boolean => {
  if (text === undefined) { return false }

  if (typeof text === 'string' || typeof text === 'number') {
    return text === textToCompare
  }

  return text.test(textToCompare)
}

const getTextFromNode = (node: Node): string => {
  const isTextNode = ({ nodeType, textContent }: Node): boolean => nodeType === Node.TEXT_NODE && Boolean(textContent)
  const getText = ({ textContent }: Node): string => textContent as string

  return [ ...node.childNodes ]
    .filter(isTextNode)
    .map(getText)
    .join('')
}

const getTextComparator = (text: TextMatcher) => (node: DOMNode): boolean => {
  const ariaLabel = node.getAttribute(DOMAttribute.AriaLabel)
  if (ariaLabel) {
    return compareText(text, ariaLabel)
  }

  const alt = node.getAttribute(DOMAttribute.Alt)
  if (alt) {
    return compareText(text, alt)
  }

  return compareText(text, getTextFromNode(node))
}

const getMultipleTextComparator = (text: TextMatcher) => (node: DOMNode): boolean => {
  const ariaLabel = node.getAttribute(DOMAttribute.AriaLabel)
  const alt = node.getAttribute(DOMAttribute.Alt)
  if (!ariaLabel && !alt) {
    return compareText(text, getTextFromNode(node))
  }

  if (ariaLabel) {
    return compareText(text, ariaLabel)
  }

  if (alt) {
    return compareText(text, alt)
  }

  throw new Error(`Cannot find text ${ text } in given node`)
}

const getLabelComparator =
  (text: TextMatcher) =>
    (node: HTMLLabelElement): boolean => compareText(text, getTextFromNode(node))

const getAttributeComparator =
  (attributeValue: TextMatcher, attributeName: DOMAttribute) =>
    (node: DOMNode): boolean => {
      const attribute = node.getAttribute(attributeName)
      if (!attribute) { return false }

      return compareText(attributeValue, attribute)
}

const getValueComparator = (value: TextMatcher) => (node: DOMNode): boolean => {
  const { options, selectedIndex, value: nodeValue } = node

  if (Boolean(options)) {
    const selectedOption = options[selectedIndex]
    return compareText(value, selectedOption.textContent || '')
  }

  return compareText(value, nodeValue)
}

export {
  getTextComparator,
  getMultipleTextComparator,
  getLabelComparator,
  getAttributeComparator,
  getValueComparator,
  TextMatcher,
}