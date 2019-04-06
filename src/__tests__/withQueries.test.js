import { mount } from './mount.util'

describe('withQueries', () => {
  const node = `
    <div role="main">
      <p data-test="a-data-test">a text</p>
      <label for="an-id">a label text</label>
      <input id="an-id" value="an input value" />
      <select>
        <option value="doesnt really matter" selected>a select value</option>
        <option value="who cares">a not selected option</option>
      </select>
      <textarea>a textarea value</textarea>
      <a href="#" role="button">aaa</a>
      <img alt="an alt text" />
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
    expect(nodeMountedWithTools.getByText('a text').isRendered()).toBeTruthy()
    expect(nodeMountedWithTools.getByText(/A Text/i).isRendered()).toBeTruthy()
  })

  it('should get all nodes by its text', () => {
    expect(nodeMountedWithTools.getAllByText('a text')).toHaveLength(1)
    expect(nodeMountedWithTools.getAllByText(/^A Text$/i)).toHaveLength(1)
  })

  it('should get a form control by its label', () => {
    expect(nodeMountedWithTools.getByLabelText('a label text').isRendered()).toBeTruthy()
    expect(nodeMountedWithTools.getByLabelText(/A Label TEXT/i).isRendered()).toBeTruthy()
  })

  it('should get a node by its role', () => {
    expect(nodeMountedWithTools.getByRole('button').isRendered()).toBeTruthy()
  })

  it('should get a form control by its value', () => {
    expect(nodeMountedWithTools.getByValue('an input value').isRendered()).toBeTruthy()
    expect(nodeMountedWithTools.getByValue('a select value').isRendered()).toBeTruthy()
    expect(nodeMountedWithTools.getByValue(/a TEXTAREA value/i).isRendered()).toBeTruthy()
  })

  it('should get a node by its alt text', () => {
    expect(nodeMountedWithTools.getByAltText('an alt text').isRendered()).toBeTruthy()
  })

  it('should get all nodes by its alt text', () => {
    expect(nodeMountedWithTools.getAllByAltText('an alt text')).toHaveLength(1)
  })

  it('should get a node by its data-test', () => {
    expect(nodeMountedWithTools.getByDataTest('a-data-test').isRendered()).toBeTruthy()
  })

  it('should get all nodes by its data-test', () => {
    expect(nodeMountedWithTools.getAllByDataTest('a-data-test')).toHaveLength(1)
  })
})
