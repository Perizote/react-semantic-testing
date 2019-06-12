import { DOMNode, DOMAttribute } from './DOMNode'

type TextMatcher = undefined | string | number | RegExp

const matchesText = (text: TextMatcher, textToCompare: string): boolean => {
  if (text === undefined) { return false }

  if (typeof text === 'string' || typeof text === 'number') {
    return text === trimAndCollapseText(textToCompare)
  }

  return text.test(trimAndCollapseText(textToCompare))
}

const includesText = (text: TextMatcher, textToCompare: string): boolean => {
  if (text === undefined) { return false }

  if (text instanceof RegExp) {
    return text.test(trimAndCollapseText(textToCompare))
  }

  return trimAndCollapseText(textToCompare).includes(String(text))
}

const trimAndCollapseText = (text: string): string => text.trim().replace(/\s+/g, ' ')

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
    return matchesText(text, ariaLabel)
  }

  const alt = node.getAttribute(DOMAttribute.Alt)
  if (alt) {
    return matchesText(text, alt)
  }

  return matchesText(text, getTextFromNode(node))
}

const getLabelComparator =
  (text: TextMatcher) =>
    (node: HTMLLabelElement): boolean => matchesText(text, getTextFromNode(node))

const getAttributeComparator =
  (attributeValue: TextMatcher, attributeName: DOMAttribute) =>
    (node: DOMNode): boolean => {
      const attribute = node.getAttribute(attributeName)
      if (!attribute) { return false }

      return matchesText(attributeValue, attribute)
}

const getValueComparator = (value: TextMatcher) => (node: DOMNode): boolean => {
  const { options, selectedIndex, value: nodeValue } = node

  if (Boolean(options)) {
    const selectedOption = options[selectedIndex]
    return matchesText(value, selectedOption.textContent || '')
  }

  return matchesText(value, nodeValue)
}

export {
  matchesText,
  includesText,
  trimAndCollapseText,
  getTextComparator,
  getLabelComparator,
  getAttributeComparator,
  getValueComparator,
  TextMatcher,
}