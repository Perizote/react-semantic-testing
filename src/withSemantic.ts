import { getSemanticEvents, SemanticEvents } from './getSemanticEvents'
import { getSemanticQueries, SemanticQueries } from './getSemanticQueries'
import { withHelpers, NodeWithHelpers } from './withHelpers'
import { withMutations, NodeWithMutations } from './withMutations'
import { DOMNode } from './utils/DOMNode'

type SemanticNode =
  & SemanticEvents
  & SemanticQueries
  & NodeWithHelpers
  & NodeWithMutations

const withSemantic = (node: DOMNode): SemanticNode => ({
  ...getSemanticEvents(node),
  ...getSemanticQueries(node),
  ...withHelpers(node),
  ...withMutations(node),
})

export { withSemantic, SemanticNode }