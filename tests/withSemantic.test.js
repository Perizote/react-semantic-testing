import { mount, unmount } from './mounting.util'

describe('withSemantic', () => {
  const node = '<button disabled>a disabled button</button>'
  let nodeMountedWithTools

  beforeEach(() => {
    nodeMountedWithTools = mount(node)
  })

  afterEach(unmount)

  it('should be rendered', () => {
    expect(nodeMountedWithTools).toBeRendered()
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
    expect(nodeMountedWithTools).toHaveText('a disabled button')
    expect(nodeMountedWithTools).toHaveText(/A Disabled Button/i)
  })

  it('should be disabled', () => {
    expect(nodeMountedWithTools.getByText('a disabled button')).toBeDisabled()
  })
})
