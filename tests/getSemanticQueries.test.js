import React from 'react'
import { mount, unmount } from '../src'

describe('getSemanticQueries', () => {
  const Form = () => (
    <div role="main">
      <p data-test="a-data-test">a text</p>
      <button aria-label="an aria label">X</button>
      <label htmlFor="an-id">a label text</label>
      <input onChange={ () => null } id="an-id" value="an input value" />
      <select value="doesnt really matter" onChange={ () => null }>
        <option value="doesnt really matter">a select value</option>
        <option value="who cares">a not selected option</option>
      </select>
      <textarea value="a textarea value" onChange={ () => null } />
      <a href="#" role="button">aaa</a>
      <img alt="an alt text" />
    </div>
  )
  let form

  beforeEach(() => {
    form = mount(<Form />)
  })

  afterEach(unmount)

  it('should get a node by its text', () => {
    expect(form.getByText('a text')).toBeRendered()
    expect(form.getByText(/A Text/i)).toBeRendered()
    expect(form.getByText('an aria label')).toBeRendered()
    expect(form.getByText(/An ARIA Label/i)).toBeRendered()
  })

  it('should get all nodes by its text', () => {
    expect(form.getAllByText('a text')).toHaveLength(1)
    expect(form.getAllByText(/^A Text$/i)).toHaveLength(1)
    expect(form.getAllByText('an aria label')).toHaveLength(1)
    expect(form.getAllByText(/An ARIA Label/i)).toHaveLength(1)
  })

  it('should get a form control by its label', () => {
    expect(form.getByLabelText('a label text')).toBeRendered()
    expect(form.getByLabelText(/A Label TEXT/i)).toBeRendered()
  })

  it('should get a node by its role', () => {
    expect(form.getByRole('button')).toBeRendered()
    expect(form.getByRole(/BuTTon/i)).toBeRendered()
  })

  it('should get a form control by its value', () => {
    expect(form.getByValue('an input value')).toBeRendered()
    expect(form.getByValue('a select value')).toBeRendered()
    expect(form.getByValue(/a TEXTAREA value/i)).toBeRendered()
  })

  it('should get a node by its alt text', () => {
    expect(form.getByText('an alt text')).toBeRendered()
    expect(form.getByText(/An ALT Text/i)).toBeRendered()
  })

  it('should get all nodes by its alt text', () => {
    expect(form.getAllByText('an alt text')).toHaveLength(1)
    expect(form.getAllByText(/An ALT Text/i)).toHaveLength(1)
  })

  it('should get a node by its data-test', () => {
    expect(form.getByDataTest('a-data-test')).toBeRendered()
    expect(form.getByDataTest(/a-DATA-TEST/i)).toBeRendered()
  })

  it('should get all nodes by its data-test', () => {
    expect(form.getAllByDataTest('a-data-test')).toHaveLength(1)
    expect(form.getAllByDataTest(/a-DATA-TEST/i)).toHaveLength(1)
  })
})
