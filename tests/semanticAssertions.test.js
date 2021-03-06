import React from 'react'
import { mount, unmount } from '../src'
import { semanticAssertions } from '../src/semanticAssertions'

describe('semantic assertions can be used to extend jest', () => {
  let form
  const Form = () => (
    <div>
      <form aria-label="an aria label">
        <label htmlFor="an id" data-test="label-data-test">a node</label>
        <input id="an id" disabled value="a value" checked onChange={ () => null } />
        <select value="0" data-test="a-select-data-test" onChange={ () => null }>
          <option>a selected value</option>
          <option>a no selected value</option>
        </select>
      </form>
      <img src="../the/path" alt="an alt text" />
    </div>
  )

  beforeEach(() => {
    form = mount(<Form />)
  })

  afterEach(unmount)

  it('should check that is rendered', () => {
    const { message, pass } = semanticAssertions.toBeRendered(form)

    expect(message).toBe('expected node not to be rendered')
    expect(pass).toBeTruthy()
  })

  it('should check that is not rendered', () => {
    unmount()
    const { message, pass } = semanticAssertions.toBeRendered(form)

    expect(message).toBe('expected node to be rendered')
    expect(pass).toBeFalsy()
  })

  it('should check that has text', () => {
    const text = /a node/
    const { message, pass } = semanticAssertions.toHaveText(form, text)

    expect(message).toBe(`expected node not to have text "${ text }" but actually does`)
    expect(pass).toBeTruthy()
  })

  it('should check that has aria-label text', () => {
    const ariaLabelText = /an aria label/
    const { message, pass } = semanticAssertions.toHaveText(form, ariaLabelText)

    expect(message).toBe(`expected node not to have text "${ ariaLabelText }" but actually does`)
    expect(pass).toBeTruthy()
  })

  it('should check that has alt text', () => {
    const altText = /an alt text/
    const { message, pass } = semanticAssertions.toHaveText(form, altText)

    expect(message).toBe(`expected node not to have text "${ altText }" but actually does`)
    expect(pass).toBeTruthy()
  })

  it('should check that does not have text', () => {
    const dataTest = 'label-data-test'
    const text = 'a node'
    const aNotFoundText = 'a not found text'
    const { message, pass } = semanticAssertions.toHaveText(form.getByDataTest(dataTest), aNotFoundText)

    expect(message).toBe(`expected node to have text "${ aNotFoundText }" but instead has "${ text }"`)
    expect(pass).toBeFalsy()
  })

  it('should check that is disabled', () => {
    const { message, pass } = semanticAssertions.toBeDisabled(form.getByLabelText(/a node/))

    expect(message).toBe('expected node not to be disabled')
    expect(pass).toBeTruthy()
  })

  it('should check that is not disabled', () => {
    const { message, pass } = semanticAssertions.toBeDisabled(form.getByText(/a node/))

    expect(message).toBe('expected node to be disabled')
    expect(pass).toBeFalsy()
  })

  it('should check that has value', () => {
    const text = /a node/
    const value = 'a value'
    const { message, pass } = semanticAssertions.toHaveValue(form.getByLabelText(text), value)

    expect(message).toBe(`expected node not to have value "${ value }" but actually does`)
    expect(pass).toBeTruthy()
  })

  it('should check that has selected value', () => {
    const dataTest = 'a-select-data-test'
    const selectedValue = 'a selected value'
    const { message, pass } = semanticAssertions.toHaveValue(form.getByDataTest(dataTest), selectedValue)

    expect(message).toBe(`expected node not to have value "${ selectedValue }" but actually does`)
    expect(pass).toBeTruthy()
  })

  it('should check that does not have value', () => {
    const text = /a node/
    const value = 'a value'
    const aNotFoundValue = 'a not found value'
    const { message, pass } = semanticAssertions.toHaveValue(form.getByLabelText(text), aNotFoundValue)

    expect(message).toBe(`expected node to have value "${ aNotFoundValue }" but instead has "${ value }"`)
    expect(pass).toBeFalsy()
  })

  it('should check that is checked', () => {
    const { message, pass } = semanticAssertions.toBeChecked(form.getByLabelText(/a node/))

    expect(message).toBe('expected node not to be checked')
    expect(pass).toBeTruthy()
  })

  it('should check that is not checked', () => {
    const { message, pass } = semanticAssertions.toBeChecked(form.getByText(/a node/))

    expect(message).toBe('expected node to be checked')
    expect(pass).toBeFalsy()
  })

  it('should check that has focus', () => {
    const selectElement = form.getByValue('a selected value')
    selectElement.getRawNode().focus()

    const { message, pass } = semanticAssertions.toHaveFocus(selectElement)

    expect(message).toBe('expected node not to have focus')
    expect(pass).toBeTruthy()
  })

  it('should check that does not have focus', () => {
    form.getRawNode().focus()

    const { message, pass } = semanticAssertions.toHaveFocus(form.getByValue('a selected value'))

    expect(message).toBe('expected node to have focus')
    expect(pass).toBeFalsy()
  })
})