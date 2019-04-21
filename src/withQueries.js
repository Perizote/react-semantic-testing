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

function withQueries(node) {
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
    const ariaLabel = node.getAttribute('aria-label')
    if (Boolean(ariaLabel)) {
      return compareText(text, ariaLabel)
    }
    return compareText(text, getTextFromNode(node))
  }

  const getAltTextComparator = altText => node => {
    return compareText(altText, node.getAttribute('alt'))
  }

  return {
    getByDataTest(dataTest) {
      const query = () => withTools(node.querySelector(`[data-test="${ dataTest }"]`))
      setAsLastQuery(query)
      return query()
    },
    getAllByDataTest(dataTest) {
      const query = () => [ ...node.querySelectorAll(`[data-test="${ dataTest }"]`) ].map(withTools)
      setAsLastQuery(query)
      return query()
    },
    getByText(text) {
      const query = () => withTools(
        [ ...node.querySelectorAll('*') ].find(getTextComparator(text))
      )
      setAsLastQuery(query)
      return query()
    },
    getAllByText(text) {
      const query = () => [ ...node.querySelectorAll('*') ].filter(getTextComparator(text)).map(withTools)
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
      const query = () => withTools([ ...node.querySelectorAll('[alt]') ].find(getAltTextComparator(altText)))
      setAsLastQuery(query)
      return query()
    },
    getAllByAltText(altText) {
      const query = () => [ ...node.querySelectorAll('[alt]') ].filter(getAltTextComparator(altText)).map(withTools)
      setAsLastQuery(query)
      return query()
    },
    getByRole(role) {
      const query = () => withTools(node.querySelector(`[role="${ role }"]`))
      setAsLastQuery(query)
      return query()
    },
    getByValue(value) {
      const query = () => withTools(
        [ ...node.querySelectorAll('input, select, textarea') ].find(({ options, value: nodeValue }) => {
          if (Boolean(options)) {
            const optionSelected = [ ...options ].find(option => option.selected)
            return compareText(value, optionSelected.textContent)
          }

          return compareText(value, nodeValue)
        })
      )
      setAsLastQuery(query)
      return query()
    }
  }
}

export { withQueries, setAsLastQuery, getLastQuery as lastQuery }