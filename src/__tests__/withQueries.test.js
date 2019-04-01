import { mount } from './mount.util'

describe('withTools', () => {
  const node = `
    <div>
      <p>a text</p>
    </div>
  `
  let nodeMountedWithTools

  beforeEach(() => {
    nodeMountedWithTools = mount(node)
  })

  afterEach(() => {
    nodeMountedWithTools.unmount()
  })

  it('should get a node by its text', () => {
    expect(nodeMountedWithTools.getByText('a text')).toBeTruthy()
    expect(nodeMountedWithTools.getByText(/A Text/i)).toBeTruthy()
  })

  it('should get all nodes by its text', () => {
    expect(nodeMountedWithTools.getAllByText('a text')).toHaveLength(1)
    expect(nodeMountedWithTools.getAllByText(/A Text/i)).toHaveLength(1)
  })
})
