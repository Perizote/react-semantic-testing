import { mount } from './mount.util'

describe('withMutations', () => {
  const initialText = 'an initial text'
  const node = `<span>${ initialText }</span>`
  let mountedNodeWithTools

  beforeEach(() => {
    mountedNodeWithTools = mount(node)
  })

  afterEach(() => {
    mountedNodeWithTools.unmount()
  })

  async function testThatObserverThrowsError(observerName, errorMessage) {
    jest.useFakeTimers()
    const observer = mountedNodeWithTools[observerName]()

    jest.advanceTimersByTime(3100)

    await expect(observer).rejects.toBe(errorMessage)
    jest.useRealTimers()
  }

  it('should observe changes', () => {
    const changedText = 'a changed text'
    const asyncChange = () => setTimeout(() => mountedNodeWithTools.getRawNode().textContent = changedText)
    expect(mountedNodeWithTools.getText()).toBe(initialText)

    asyncChange()

    return expect(mountedNodeWithTools.waitUntilItChanges()).resolves.toHaveText(changedText)
  })

  it('should throw an error when nothing changes', () => {
    testThatObserverThrowsError('waitUntilItChanges', 'Timeout waiting for node to change')
  })

  it('should observe new renders', () => {
    const asyncRender = () => setTimeout(() => mountedNodeWithTools.getRawNode().innerHTML = '<p>another node</p>')
    expect(mountedNodeWithTools.getByText('another node')).not.toBeRendered()

    asyncRender()

    return expect(mountedNodeWithTools.getByText('another node').waitUntilItAppears()).resolves.toBeRendered()
  })

  it('should throw an error when nothing new is rendered', () => {
    testThatObserverThrowsError('waitUntilItAppears', 'Timeout waiting for node to render')
  })

  it('should observe disappearances', () => {
    const asyncDisappear = () => setTimeout(() => mountedNodeWithTools.getRawNode().innerHTML = null)
    expect(mountedNodeWithTools.getByText(initialText)).toBeRendered()

    asyncDisappear()

    return expect(mountedNodeWithTools.getByText(initialText).waitUntilItDisappears()).resolves.not.toBeRendered()
  })

  it('should throw an error when nothing disappears', () => {
    testThatObserverThrowsError('waitUntilItDisappears', 'Timeout waiting for node to disappear')
  })
})