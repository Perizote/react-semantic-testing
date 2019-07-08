import { getSemanticEvents, SemanticEvents } from './getSemanticEvents'
import { getSemanticQueries, SemanticQueries } from './getSemanticQueries'
import { withHelpers, NodeWithHelpers } from './withHelpers'
import { getSemanticMutations, SemanticMutations } from './getSemanticMutations'
import { DOMNode } from './utils/DOMNode'

type SemanticNode =
  & SemanticEvents
  & SemanticQueries
  & NodeWithHelpers
  & SemanticMutations

const withSemantic = (node: DOMNode): SemanticNode => ({
  ...getSemanticEvents(node),
  ...getSemanticQueries(node),
  ...withHelpers(node),
  ...getSemanticMutations(node),
})

export { withSemantic, SemanticNode }