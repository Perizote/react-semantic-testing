import { withEvents, NodeWithEvents } from './withEvents'
import { withQueries, NodeWithQueries } from './withQueries'
import { withHelpers, NodeWithHelpers } from './withHelpers'
import { withMutations, NodeWithMutations } from './withMutations'

type NodeWithTools =
  & NodeWithEvents
  & NodeWithQueries
  & NodeWithHelpers
  & NodeWithMutations
type HTMLElementWithValue =
  | HTMLButtonElement
  | HTMLDataElement
  | HTMLInputElement
  | HTMLLIElement
  | HTMLMeterElement
  | HTMLOptionElement
  | HTMLProgressElement
  | HTMLParamElement

const withTools = (node: Node & HTMLElementWithValue): NodeWithTools => ({
  ...withEvents(node),
  ...withQueries(node),
  ...withHelpers(node),
  ...withMutations(node),
})

export { withTools, NodeWithTools }