import { mount } from './mount.util'
import { assertions } from '../'

expect.extend(assertions)

describe('assertions', () => {
  it('can be used to extend jest', () => {
    const nodeMountedWithTools = mount(`
      <form>
        <label for="an id">a node</label>
        <input id="an id" disabled value="a value" />
      </form>
    `)

    expect(nodeMountedWithTools).toBeRendered()
    expect(nodeMountedWithTools).toHaveText(/a node/)
    expect(nodeMountedWithTools.getByLabelText('a node')).toBeDisabled()
    expect(nodeMountedWithTools.getByLabelText('a node')).toHaveValue('a value')
  })
})