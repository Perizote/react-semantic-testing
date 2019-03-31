import { withTools } from '../'

describe('withTools', () => {
  const node = `
    <select>
      <option value="1" selected>Gilded Rose</option>
      <option value="2">Mars rover</option>
    </select>
  `
  let nodeWithTools

  beforeEach(() => {
    nodeWithTools = withTools(node)
  })

  it('should return the raw node without any tool', () => {
    expect(nodeWithTools.getRawNode()).toEqual(node)
  })

  it('should return the text content of the node', () => {
    expect(nodeWithTools.getText()).toBe(node.textContent)
  })

  it('should return the value of the node', () => {
    expect(nodeWithTools.getValue()).toBe(node.value)
  })
})