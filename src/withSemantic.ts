import { withEvents, NodeWithEvents } from './withEvents'
import { getSemanticQueries, SemanticQueries } from './getSemanticQueries'
import { withHelpers, NodeWithHelpers } from './withHelpers'
import { withMutations, NodeWithMutations } from './withMutations'
import { DOMNode } from './utils/DOMNode'

type SemanticNode =
  & NodeWithEvents
  & SemanticQueries
  & NodeWithHelpers
  & NodeWithMutations

const withSemantic = (node: DOMNode): SemanticNode => ({
  ...withEvents(node),
  ...getSemanticQueries(node),
  ...withHelpers(node),
  ...withMutations(node),
})

export { withSemantic, SemanticNode }