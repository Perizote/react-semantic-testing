import { getSemanticEvents, SemanticEvents } from './getSemanticEvents'
import { getSemanticQueries, SemanticQueries } from './getSemanticQueries'
import { getSemanticHelpers, SemanticHelpers } from './getSemanticHelpers'
import { getSemanticMutations, SemanticMutations } from './getSemanticMutations'
import { DOMNode } from './utils/DOMNode'

type SemanticNode =
  & SemanticEvents
  & SemanticQueries
  & SemanticHelpers
  & SemanticMutations

const withSemantic = (node: DOMNode): SemanticNode => ({
  ...getSemanticEvents(node),
  ...getSemanticQueries(node),
  ...getSemanticHelpers(node),
  ...getSemanticMutations(node),
})

export { withSemantic, SemanticNode }