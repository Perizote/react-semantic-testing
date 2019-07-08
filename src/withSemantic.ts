import { withEvents, NodeWithEvents } from './withEvents'
import { withQueries, NodeWithQueries } from './withQueries'
import { withHelpers, NodeWithHelpers } from './withHelpers'
import { withMutations, NodeWithMutations } from './withMutations'
import { DOMNode } from './utils/DOMNode'

type SemanticNode =
  & NodeWithEvents
  & NodeWithQueries
  & NodeWithHelpers
  & NodeWithMutations

const withSemantic = (node: DOMNode): SemanticNode => ({
  ...withEvents(node),
  ...withQueries(node),
  ...withHelpers(node),
  ...withMutations(node),
})

export { withSemantic, SemanticNode }