import { withTools } from '../'
import { mount } from './mount.util'

describe('withTools', () => {
  describe('without mounting', () => {
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

  describe('when mounting', () => {
    const node = `<div>a simple node</div>`
    let nodeMountedWithTools

    beforeEach(() => {
      nodeMountedWithTools = mount(node)
    })

    it('should be rendered', () => {
      expect(nodeMountedWithTools.isRendered()).toBeTruthy()
    })

    it('should unmount the node', () => {
      expect(nodeMountedWithTools.isRendered()).toBeTruthy()
      nodeMountedWithTools.unmount()
      expect(nodeMountedWithTools.isRendered()).toBeFalsy()
    })

    it('should log the tree of the node', () => {
      const spy = jest.spyOn(console, 'log').mockImplementationOnce(() => {})

      nodeMountedWithTools.logTree()

      expect(spy).toHaveBeenCalledTimes(1)
      const [[firstArg]] = spy.mock.calls
      expect(firstArg).toMatchInlineSnapshot(`
"[36m<div>[39m
  [36m<div>[39m
    [0ma simple node[0m
  [36m</div>[39m
[36m</div>[39m"
`)
    })

    it('should have text', () => {
      expect(nodeMountedWithTools.hasText('a simple node')).toBeTruthy()
      expect(nodeMountedWithTools.hasText(/A Simple Node/i)).toBeTruthy()
    })
  })
})
