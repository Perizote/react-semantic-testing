import { getSemanticEvents, SemanticEvents } from './getSemanticEvents'
import { getSemanticHelpers, SemanticHelpers } from './getSemanticHelpers'
import { getSemanticMutations, SemanticMutations } from './getSemanticMutations'
import {
  getTextComparator,
  getLabelComparator,
  getAttributeComparator,
  getValueComparator,
  TextMatcher,
} from './utils/matchers'
import { DOMNode, DOMNodeList, DOMAttribute, DOMTag } from './utils/DOMNode'

type SemanticNodeWithoutQueries = SemanticEvents & SemanticHelpers & SemanticMutations
type QueryForNodeListResult = SemanticNodeWithoutQueries[]
type QueryForSingleNodeResult = SemanticNodeWithoutQueries
type QueryResult = QueryForSingleNodeResult | QueryForNodeListResult
type Query = () => QueryResult
type SemanticQueries = {
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

const withSemantic = (node: DOMNode): SemanticNodeWithoutQueries => ({
  ...getSemanticEvents(node),
  ...getSemanticHelpers(node),
  ...getSemanticMutations(node),
})

const buildQueryForLists = (listOfFoundNodes: DOMNodeList): QueryForNodeListResult => listOfFoundNodes.map(withSemantic)

const getSemanticQueries = (node: DOMNode): SemanticQueries => ({
  getByDataTest(dataTest: TextMatcher): QueryForSingleNodeResult {
    const query = () => withSemantic(
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
    const query = () => withSemantic(
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
      return withSemantic(control as DOMNode)
    }
    setAsLastQuery(query)
    return query()
  },
  getByRole(role: TextMatcher): QueryForSingleNodeResult {
    const query = () => withSemantic(
      ([ ...node.querySelectorAll(`[${ DOMAttribute.Role }]`) ] as DOMNodeList)
        .find(getAttributeComparator(role, DOMAttribute.Role)) as DOMNode
    )
    setAsLastQuery(query)
    return query()
  },
  getByValue(value: TextMatcher): QueryForSingleNodeResult {
    const query = () => withSemantic(
      ([ ...node.querySelectorAll(`${ DOMTag.Input }, ${ DOMTag.Select }, ${ DOMTag.TextArea }`) ] as DOMNodeList)
        .find(getValueComparator(value)) as DOMNode
    )
    setAsLastQuery(query)
    return query()
  }
})

export {
  getSemanticQueries,
  setAsLastQuery,
  getLastQuery as lastQuery,
  SemanticQueries,
  QueryResult,
  QueryForNodeListResult,
  QueryForSingleNodeResult
}