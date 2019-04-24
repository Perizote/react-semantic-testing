import { compareText } from './compareText'
import { withEvents } from './withEvents'
import { withHelpers } from './withHelpers'
import { withMutations } from './withMutations'

let lastQuery

const setAsLastQuery = query => lastQuery = query

const getLastQuery = () => lastQuery()

const withTools = node => ({
  ...withEvents(node),
  ...withHelpers(node),
  ...withMutations(node),
})

const ATTRIBUTES = {
  ARIA_LABEL: 'aria-label',
  DATA_TEST: 'data-test',
  ALT: 'alt',
  ROLE: 'role',
}

const getLabelComparator = text => node => {
  return compareText(text, getTextFromNode(node))
}

const getTextFromNode = node => {
  const isTextNode = ({ nodeType, textContent }) => nodeType === Node.TEXT_NODE && Boolean(textContent)

  return [ ...node.childNodes]
    .filter(isTextNode)
    .map(({ textContent }) => textContent)
    .join('')
}

const getTextComparator = text => node => {
  const ariaLabel = node.getAttribute(ATTRIBUTES.ARIA_LABEL)
  if (Boolean(ariaLabel)) {
    return compareText(text, ariaLabel)
  }
  const alt = node.getAttribute(ATTRIBUTES.ALT)
  if (Boolean(alt)) {
    return compareText(text, alt)
  }
  return compareText(text, getTextFromNode(node))
}

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

const buildQueryForLists = listOfFoundNodes => {
  if (listOfFoundNodes.length === 0){
    return withTools([])
  }

  return listOfFoundNodes.map(withTools)
}

function withQueries(node) {
  return {
    getByDataTest(dataTest) {
      const query = () => withTools(
        [ ...node.querySelectorAll(`[${ ATTRIBUTES.DATA_TEST }]`) ]
          .find(getAttributeComparator(dataTest, ATTRIBUTES.DATA_TEST))
      )
      setAsLastQuery(query)
      return query()
    },
    getAllByDataTest(dataTest) {
      const query = () => buildQueryForLists(
        [ ...node.querySelectorAll(`[${ ATTRIBUTES.DATA_TEST }]`) ]
          .filter(getAttributeComparator(dataTest, ATTRIBUTES.DATA_TEST))
      )
      setAsLastQuery(query)
      return query()
    },
    getByText(text) {
      const query = () => withTools([ ...node.querySelectorAll('*') ].find(getTextComparator(text)))
      setAsLastQuery(query)
      return query()
    },
    getAllByText(text) {
      const query = () => buildQueryForLists([ ...node.querySelectorAll('*') ].filter(getTextComparator(text)))
      setAsLastQuery(query)
      return query()
    },
    getByLabelText(labelText) {
      const query = () => {
        const { control: input } = [ ...node.querySelectorAll('label') ].find(getLabelComparator(labelText)) || {}
        return withTools(input)
      }
      setAsLastQuery(query)
      return query()
    },
    getByAltText(altText) {
      const query = () => withTools([ ...node.querySelectorAll(`[${ ATTRIBUTES.ALT }]`) ]
        .find(getAttributeComparator(altText, ATTRIBUTES.ALT)))
      setAsLastQuery(query)
      return query()
    },
    getAllByAltText(altText) {
      const query = () => buildQueryForLists(
        [ ...node.querySelectorAll(`[${ ATTRIBUTES.ALT }]`) ]
          .filter(getAttributeComparator(altText, ATTRIBUTES.ALT))
      )
      setAsLastQuery(query)
      return query()
    },
    getByRole(role) {
      const query = () => withTools([ ...node.querySelectorAll(`[${ ATTRIBUTES.ROLE }]`) ]
        .find(getAttributeComparator(role, ATTRIBUTES.ROLE)))
      setAsLastQuery(query)
      return query()
    },
    getByValue(value) {
      const query = () => withTools(
        [ ...node.querySelectorAll('input, select, textarea') ].find(getValueComparator(value))
      )
      setAsLastQuery(query)
      return query()
    }
  }
}

export { withQueries, setAsLastQuery, getLastQuery as lastQuery }