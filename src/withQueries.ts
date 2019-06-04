import { withEvents } from './withEvents'
import { withHelpers } from './withHelpers'
import { withMutations } from './withMutations'
import {
  DOM_ATTRIBUTES,
  DOM_TAGS,
  getTextComparator,
  getLabelComparator,
  getAttributeComparator,
  getValueComparator,
} from './utils'

type NodeWithQueries = any

let lastQuery

const setAsLastQuery = query => lastQuery = query

const getLastQuery = () => lastQuery()

const withTools = node => ({
  ...withEvents(node),
  ...withHelpers(node),
  ...withMutations(node),
})

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
        [ ...node.querySelectorAll(`[${ DOM_ATTRIBUTES.DATA_TEST }]`) ]
          .find(getAttributeComparator(dataTest, DOM_ATTRIBUTES.DATA_TEST))
      )
      setAsLastQuery(query)
      return query()
    },
    getAllByDataTest(dataTest) {
      const query = () => buildQueryForLists(
        [ ...node.querySelectorAll(`[${ DOM_ATTRIBUTES.DATA_TEST }]`) ]
          .filter(getAttributeComparator(dataTest, DOM_ATTRIBUTES.DATA_TEST))
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
        const { control: input } = [ ...node.querySelectorAll(DOM_TAGS.LABEL) ].find(getLabelComparator(labelText)) || {}
        return withTools(input)
      }
      setAsLastQuery(query)
      return query()
    },
    getByRole(role) {
      const query = () => withTools([ ...node.querySelectorAll(`[${ DOM_ATTRIBUTES.ROLE }]`) ]
        .find(getAttributeComparator(role, DOM_ATTRIBUTES.ROLE)))
      setAsLastQuery(query)
      return query()
    },
    getByValue(value) {
      const query = () => withTools(
        [ ...node.querySelectorAll(`${ DOM_TAGS.INPUT }, ${ DOM_TAGS.SELECT }, ${ DOM_TAGS.TEXT_AREA }`) ]
          .find(getValueComparator(value))
      )
      setAsLastQuery(query)
      return query()
    }
  }
}

export { withQueries, setAsLastQuery, getLastQuery as lastQuery, NodeWithQueries }