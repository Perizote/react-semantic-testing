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

  describe('unmounting a node', () => {
    const node = `<div>a simple node</div>`

    it('should remove the node from the dom tree', () => {
      const nodeMountedWithTools = mount(node)
      expect(nodeMountedWithTools.isRendered()).toBeTruthy()
      nodeMountedWithTools.unmount()

      expect(nodeMountedWithTools.isRendered()).toBeFalsy()
    })

    it('should throw an error if the node is not in the dom', () => {
      const nodeMountedWithTools = mount(node)
      nodeMountedWithTools.unmount()
      expect(nodeMountedWithTools.isRendered()).toBeFalsy()
      expect(nodeMountedWithTools.unmount).toThrow('Cannot unmount a node that is not rendered')
    })
  })

  describe('when mounting', () => {
    const node = '<button disabled>a disabled button</button>'
    let nodeMountedWithTools

    beforeEach(() => {
      nodeMountedWithTools = mount(node)
    })

    afterEach(() => {
      nodeMountedWithTools.unmount()
    })

    it('should be rendered', () => {
      expect(nodeMountedWithTools.isRendered()).toBeTruthy()
    })

    it('should log the tree of the node', () => {
      const spy = jest.spyOn(console, 'log').mockImplementationOnce(() => {})

      nodeMountedWithTools.logTree()

      expect(spy).toHaveBeenCalledTimes(1)
      const [[firstArg]] = spy.mock.calls
      expect(firstArg).toMatchInlineSnapshot(`
"[36m<div>[39m
  [36m<button[39m
    [33mdisabled[39m=[32m\\"\\"[39m
  [36m>[39m
    [0ma disabled button[0m
  [36m</button>[39m
[36m</div>[39m"
`)
    })

    it('should have text', () => {
      expect(nodeMountedWithTools.hasText('a disabled button')).toBeTruthy()
      expect(nodeMountedWithTools.hasText(/A Disabled Button/i)).toBeTruthy()
    })

    it('should be disabled', () => {
      expect(
        nodeMountedWithTools.getByText('a disabled button').isDisabled(),
      ).toBeTruthy()
    })
  })
})
