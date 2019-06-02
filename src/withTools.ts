import { withEvents } from './withEvents'
import { withQueries } from './withQueries'
import { withHelpers } from './withHelpers'
import { withMutations } from './withMutations'

function withTools(node) {
  return {
    ...withEvents(node),
    ...withQueries(node),
    ...withHelpers(node),
    ...withMutations(node),
  }
}

export { withTools }