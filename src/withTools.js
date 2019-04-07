import { unmountComponentAtNode } from 'react-dom'

import { withEvents } from './withEvents'
import { withQueries } from './withQueries'
import { withHelpers } from './withHelpers'
import { withMutations } from './withMutations'

function withTools(node) {
  return {
    unmount() {
      if (!document.body.contains(node)) {
        throw new Error('Cannot unmount a node that is not rendered')
      }

      unmountComponentAtNode(node)
      document.body.removeChild(node)
    },
    ...withEvents(node),
    ...withQueries(node),
    ...withHelpers(node),
    ...withMutations(node),
  }
}

export { withTools }