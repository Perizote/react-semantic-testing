import { render, unmountComponentAtNode } from 'react-dom'

import { JSDOM } from 'jsdom'
import 'mutationobserver-shim'

const { document } = (new JSDOM(`<div id="root"></div>`)).window

async function createMutationObserver(callback, { timeout = 3000, node, actionToWaitFor = 'change' } = {}) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(onTimeout, timeout)
    const mutationObserver = new MutationObserver(onMutation)
    mutationObserver.observe(node, { attributes: true, childList: true, characterData: true, subtree: true })

    function onTimeout() {
      finish()
      reject(`Timeout waiting for node to ${ actionToWaitFor }`)
    }

    function onMutation() {
      const asd = callback()
      finish()
      resolve(asd)
    }    
    
    function finish() {
      clearTimeout(timer)
      mutationObserver.disconnect()
    }
  })
}

function mount(component) {
  const rootNode = document.getElementById('root')

  render(component, rootNode)

  function withTools(node, lastQuery) {
    return {
      unmount() {
        return unmountComponentAtNode(rootNode)
      },
      getRawNode() {
        return node
      },
      getByDataTest(dataTest) {
        const lastQuery = () => this.getByDataTest(dataTest)
        return withTools(node.querySelector(`[data-test="${ dataTest }"]`), lastQuery)
      },
      getText() {
        return node.textContent
      },
      getTree() {
        return rootNode.innerHTML
      },
      click() {
        const WindowEvent = document.defaultView.Event
        const event = new WindowEvent('click', { bubbles: true, cancelable: true, button: 0 })
        node.dispatchEvent(event)
      },
      async willChange() {
        function onMutation() {
          return withTools(node, lastQuery)
        }
        return createMutationObserver(onMutation, { node })
      },
      async willRender() {
        function onMutation() {
          const lastNode = lastQuery().getRawNode()
          if (!lastNode) { return }
          return withTools(lastNode, lastQuery)
        }
        return createMutationObserver(onMutation, { node: document, actionToWaitFor: 'render' })
      }
    }
  }

  return withTools(rootNode)
}

export { mount }