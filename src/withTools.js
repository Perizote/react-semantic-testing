import { unmountComponentAtNode } from 'react-dom'

import { observeChanges, observeNewRenders } from './mutationObserver'
import { getDispatchableEvents } from './getDispatchableEvents'
import { setAsLastQuery, lastQuery } from './lastQuery'

function withTools(node) {
  return {
    unmount() {
      unmountComponentAtNode(node)
      document.body.removeChild(node)
    },
    getRawNode() {
      return node
    },
    ...getQueries(node),
    getText() {
      return node.textContent
    },
    getTree() {
      return node.innerHTML
    },
    ...getDispatchableEvents(node),
    async willChange() {
      const onChange = () => {
        const { unmount, willChange, willRender, ...restOfTools } = withTools(node)
        return restOfTools
      }

      return observeChanges(onChange, node)
    },
    async willRender() {
      const onRender = () => {
        const renderedNode = lastQuery().getRawNode()

        if (!renderedNode) { return }

        const { unmount, willChange, willRender, ...restOfTools } = withTools(renderedNode)
        return restOfTools
      }

      return observeNewRenders(onRender)
    }
  }
}

function getQueries(node) {
  const getQueryTools = query => {
    const { unmount, ...restOfTools } = query()
    return restOfTools
  }

  return {
    getByDataTest(dataTest) {
      const query = () => withTools(node.querySelector(`[data-test="${ dataTest }"]`))
      setAsLastQuery(query)
      return getQueryTools(query)
    },
    getByText(text) {
      const query = () => withTools([ ...node.querySelectorAll('*') ].find(element => text === element.textContent))
      setAsLastQuery(query)
      return getQueryTools(query)
    },
  }
}

export { withTools }