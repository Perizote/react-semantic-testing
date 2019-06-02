const DOM_ATTRIBUTES = {
  ARIA_LABEL: 'aria-label',
  DATA_TEST: 'data-test',
  ALT: 'alt',
  ROLE: 'role',
}

const DOM_TAGS = {
  LABEL: 'label',
  INPUT: 'input',
  SELECT: 'select',
  TEXT_AREA: 'textarea',
}

const compareText = (text, textToCompare) => {
  if (typeof text === 'string' || typeof text === 'number') {
    return text === textToCompare
  }

  return text.test(textToCompare)
}

const getTextFromNode = node => {
  const isTextNode = ({ nodeType, textContent }) => nodeType === Node.TEXT_NODE && Boolean(textContent)

  return [ ...node.childNodes ]
    .filter(isTextNode)
    .map(({ textContent }) => textContent)
    .join('')
}

const getTextComparator = text => node => {
  const ariaLabel = node.getAttribute(DOM_ATTRIBUTES.ARIA_LABEL)
  if (Boolean(ariaLabel)) {
    return compareText(text, ariaLabel)
  }

  const alt = node.getAttribute(DOM_ATTRIBUTES.ALT)
  if (Boolean(alt)) {
    return compareText(text, alt)
  }

  return compareText(text, getTextFromNode(node))
}

const getMultipleTextComparator = text => node => {
  const ariaLabel = node.getAttribute(DOM_ATTRIBUTES.ARIA_LABEL)
  const alt = node.getAttribute(DOM_ATTRIBUTES.ALT)
  return compareText(text, getTextFromNode(node)) || compareText(text, ariaLabel) || compareText(text, alt)
}

const getLabelComparator = text => node => compareText(text, getTextFromNode(node))

const getAttributeComparator = (attributeValue, attributeName) => node => {
  return compareText(attributeValue, node.getAttribute(attributeName))
}

const getValueComparator = value => ({ options, value: nodeValue }) => {
  if (Boolean(options)) {
    const optionSelected = [ ...options ].find(option => option.selected)
    return compareText(value, optionSelected.textContent)
  }

  return compareText(value, nodeValue)
}

export {
  DOM_ATTRIBUTES,
  DOM_TAGS,
  getTextComparator,
  getMultipleTextComparator,
  getLabelComparator,
  getAttributeComparator,
  getValueComparator,
}