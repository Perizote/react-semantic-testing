import { withEvents, NodeWithEvents } from './withEvents'
import { withHelpers, NodeWithHelpers } from './withHelpers'
import { withMutations, NodeWithMutations } from './withMutations'
import {
  getTextComparator,
  getLabelComparator,
  getAttributeComparator,
  getValueComparator,
  TextMatcher,
} from './utils/matchers'
import { DOMNode, DOMNodeList, DOMAttribute, DOMTag } from './utils/DOMNode'

type NodeWithToolsWithoutQueries = NodeWithEvents & NodeWithHelpers & NodeWithMutations
type QueryForNodeListResult = NodeWithToolsWithoutQueries[]
type QueryForSingleNodeResult = NodeWithToolsWithoutQueries
type QueryResult = QueryForSingleNodeResult | QueryForNodeListResult
type Query = () => QueryResult
type NodeWithQueries = {
  getByDataTest: (dataTest: TextMatcher) => QueryForSingleNodeResult,
  getAllByDataTest: (dataTest: TextMatcher) => QueryForNodeListResult,
  getByText: (text: TextMatcher) => QueryForSingleNodeResult,
  getAllByText: (text: TextMatcher) => QueryForNodeListResult,
  getByLabelText: (labelText: TextMatcher) => QueryForSingleNodeResult,
  getByRole: (role: TextMatcher) => QueryForSingleNodeResult,
  getByValue: (value: TextMatcher) => QueryForSingleNodeResult,
}

let lastQuery: Query

const setAsLastQuery = (query: Query): void => {
  lastQuery = query
}

const getLastQuery = (): QueryResult => lastQuery()

const withTools = (node: DOMNode): NodeWithToolsWithoutQueries => ({
  ...withEvents(node),
  ...withHelpers(node),
  ...withMutations(node),
})

const buildQueryForLists = (listOfFoundNodes: DOMNodeList): QueryForNodeListResult => listOfFoundNodes.map(withTools)

const withQueries = (node: DOMNode): NodeWithQueries => ({
  getByDataTest(dataTest: TextMatcher): QueryForSingleNodeResult {
    const query = () => withTools(
      ([ ...node.querySelectorAll(`[${ DOMAttribute.DataTest }]`) ] as DOMNodeList)
        .find(getAttributeComparator(dataTest, DOMAttribute.DataTest)) as DOMNode
    )
    setAsLastQuery(query)
    return query()
  },
  getAllByDataTest(dataTest: TextMatcher): QueryForNodeListResult {
    const query = () => buildQueryForLists(
      ([ ...node.querySelectorAll(`[${ DOMAttribute.DataTest }]`) ] as DOMNodeList)
        .filter(getAttributeComparator(dataTest, DOMAttribute.DataTest))
    )
    setAsLastQuery(query)
    return query()
  },
  getByText(text: TextMatcher): QueryForSingleNodeResult {
    const query = () => withTools(
      ([ ...node.querySelectorAll('*') ] as DOMNodeList)
        .find(getTextComparator(text)) as DOMNode
    )
    setAsLastQuery(query)
    return query()
  },
  getAllByText(text: TextMatcher): QueryForNodeListResult {
    const query = () => buildQueryForLists(
      ([ ...node.querySelectorAll('*') ] as DOMNodeList)
        .filter(getTextComparator(text))
    )
    setAsLastQuery(query)
    return query()
  },
  getByLabelText(labelText: TextMatcher): QueryForSingleNodeResult {
    const query = () => {
      const { control } = ([ ...node.querySelectorAll(DOMTag.Label) ] as DOMNodeList)
        .find(getLabelComparator(labelText)) as HTMLLabelElement
      return withTools(control as DOMNode)
    }
    setAsLastQuery(query)
    return query()
  },
  getByRole(role: TextMatcher): QueryForSingleNodeResult {
    const query = () => withTools(
      ([ ...node.querySelectorAll(`[${ DOMAttribute.Role }]`) ] as DOMNodeList)
        .find(getAttributeComparator(role, DOMAttribute.Role)) as DOMNode
    )
    setAsLastQuery(query)
    return query()
  },
  getByValue(value: TextMatcher): QueryForSingleNodeResult {
    const query = () => withTools(
      ([ ...node.querySelectorAll(`${ DOMTag.Input }, ${ DOMTag.Select }, ${ DOMTag.TextArea }`) ] as DOMNodeList)
        .find(getValueComparator(value)) as DOMNode
    )
    setAsLastQuery(query)
    return query()
  }
})

export {
  withQueries,
  setAsLastQuery,
  getLastQuery as lastQuery,
  NodeWithQueries,
  QueryResult,
  QueryForNodeListResult,
  QueryForSingleNodeResult
}