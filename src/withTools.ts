import { withEvents, NodeWithEvents } from './withEvents'
import { withQueries, NodeWithQueries } from './withQueries'
import { withHelpers, NodeWithHelpers } from './withHelpers'
import { withMutations, NodeWithMutations } from './withMutations'
import { DOMNode } from './utils/DOMNode'

type NodeWithTools =
  & NodeWithEvents
  & NodeWithQueries
  & NodeWithHelpers
  & NodeWithMutations

const withTools = (node: DOMNode): NodeWithTools => ({
  ...withEvents(node),
  ...withQueries(node),
  ...withHelpers(node),
  ...withMutations(node),
})

export { withTools, NodeWithTools }