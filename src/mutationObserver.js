import 'mutationobserver-shim'

async function createMutationObserver(callback, { timeout = 3000, node, error } = {}) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(onTimeout, timeout)
    const mutationObserver = new MutationObserver(onMutation)
    mutationObserver.observe(node, { attributes: true, childList: true, characterData: true, subtree: true })

    function onTimeout() {
      finish()
      reject(error)
    }

    function onMutation(mutations) {
      const result = callback(mutations)
      finish()
      resolve(result)
    }

    function finish() {
      clearTimeout(timeoutId)
      mutationObserver.disconnect()
    }
  })
}

const observeChanges = async (onChange, node) =>
  createMutationObserver(onChange, { node, error: 'Timeout waiting for node to change' })

const observeNewRenders = async onRender =>
  createMutationObserver(onRender, { node: document, error: 'Timeout waiting for node to render' })

const observeDisappearances = async (onDisappear, node) =>
  createMutationObserver(onDisappear, { node: node.parentNode, error: 'Timeout waiting for node to disappear' })

export { observeChanges, observeNewRenders, observeDisappearances }