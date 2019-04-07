import { mount } from './mount.util'
import { assertions } from '../assertions'

describe('assertions can be used to extend jest', () => {
  let nodeMountedWithTools

  beforeEach(() => {
    nodeMountedWithTools = mount(`
      <form>
        <label for="an id">a node</label>
        <input id="an id" disabled value="a value" />
      </form>
    `)
  })

  it('should check that is rendered', () => {
    const { message, pass } = assertions.toBeRendered(nodeMountedWithTools)

    expect(message()).toBe('expected node not to be rendered')
    expect(pass).toBeTruthy()
    nodeMountedWithTools.unmount()
  })

  it('should check that is not rendered', () => {
    nodeMountedWithTools.unmount()
    const { message, pass } = assertions.toBeRendered(nodeMountedWithTools)

    expect(message()).toBe('expected node to be rendered')
    expect(pass).toBeFalsy()
  })

  it('should check that has text', () => {
    const text = /a node/
    const { message, pass } = assertions.toHaveText(nodeMountedWithTools, text)

    expect(message()).toBe(`expected node not to have text "${ text }" but actually does`)
    expect(pass).toBeTruthy()
    nodeMountedWithTools.unmount()
  })

  it('should check that does not have text', () => {
    const text = 'a node'
    const aNotFoundText = 'a not found text'
    const { message, pass } = assertions.toHaveText(nodeMountedWithTools, aNotFoundText)

    expect(message()).toBe(`expected node to have text "${ aNotFoundText }" but instead has "${ text }"`)
    expect(pass).toBeFalsy()
    nodeMountedWithTools.unmount()
  })

  it('should check that is disabled', () => {
    const { message, pass } = assertions.toBeDisabled(nodeMountedWithTools.getByLabelText(/a node/))

    expect(message()).toBe('expected node not to be disabled')
    expect(pass).toBeTruthy()
    nodeMountedWithTools.unmount()
  })

  it('should check that is not disabled', () => {
    const { message, pass } = assertions.toBeDisabled(nodeMountedWithTools.getByText(/a node/))

    expect(message()).toBe('expected node to be disabled')
    expect(pass).toBeFalsy()
    nodeMountedWithTools.unmount()
  })

  it('should check that has value', () => {
    const text = /a node/
    const value = 'a value'
    const { message, pass } = assertions.toHaveValue(nodeMountedWithTools.getByLabelText(text), value)

    expect(message()).toBe(`expected node not to have value "${ value }" but actually does`)
    expect(pass).toBeTruthy()
    nodeMountedWithTools.unmount()
  })

  it('should check that does not have value', () => {
    const text = /a node/
    const value = 'a value'
    const aNotFoundValue = 'a not found value'
    const { message, pass } = assertions.toHaveValue(nodeMountedWithTools.getByLabelText(text), aNotFoundValue)

    expect(message()).toBe(`expected node to have value "${ aNotFoundValue }" but instead has "${ value }"`)
    expect(pass).toBeFalsy()
    nodeMountedWithTools.unmount()
  })
})