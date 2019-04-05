import { mount } from './mount.util'

describe('withMutations', () => {
  const initialText = 'an initial text'
  const node = `<span>${ initialText }</span>`

  async function testThatObserverThrowsError(observerName, errorMessage) {
    jest.useFakeTimers()
    const mountedNodeWithTools = mount(node)
    const observer = mountedNodeWithTools[observerName]()
    jest.advanceTimersByTime(3100)

    await expect(observer).rejects.toBe(errorMessage)

    mountedNodeWithTools.unmount()
    jest.useRealTimers()
  }

  it('should observe changes', async () => {
    const changedText = 'a changed text'
    const mountedNodeWithTools = mount(node)
    const asyncChange = () => setTimeout(() => mountedNodeWithTools.getRawNode().textContent = changedText)
    expect(mountedNodeWithTools.getText()).toBe(initialText)

    asyncChange()

    expect((await mountedNodeWithTools.willChange()).getText()).toBe(changedText)
    mountedNodeWithTools.unmount()
  })

  it('should throw an error when nothing changes', () => {
    testThatObserverThrowsError('willChange', 'Timeout waiting for node to change')
  })

  it('should observe new renders', async () => {
    const mountedNodeWithTools = mount(node)
    const asyncRender = () => setTimeout(() => mountedNodeWithTools.getRawNode().innerHTML = '<p>another node</p>')
    expect(mountedNodeWithTools.getByText('another node').isRendered()).toBeFalsy()

    asyncRender()

    expect((await mountedNodeWithTools.getByText('another node').willRender()).isRendered()).toBeTruthy()
    mountedNodeWithTools.unmount()
  })

  it('should throw an error when nothing new is rendered', () => {
    testThatObserverThrowsError('willRender', 'Timeout waiting for node to render')
  })

  it('should observe disappearances', async () => {
    const mountedNodeWithTools = mount(node)
    const asyncDisappear = () => setTimeout(() => mountedNodeWithTools.getRawNode().innerHTML = null)
    expect(mountedNodeWithTools.getByText(initialText).isRendered()).toBeTruthy()

    asyncDisappear()

    expect((await mountedNodeWithTools.getByText(initialText).willDisappear()).isRendered()).toBeFalsy()
    mountedNodeWithTools.unmount()
  })

  it('should throw an error when nothing disappears', () => {
    testThatObserverThrowsError('willDisappear', 'Timeout waiting for node to disappear')
  })
})