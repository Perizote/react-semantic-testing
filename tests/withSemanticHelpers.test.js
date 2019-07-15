import React from 'react'
import { mount, unmount } from '../src'

describe('withSemanticHelpers', () => {
  const Input = () => (
    <div>
      <label htmlFor="an-input">a label</label>
      <input id="an-input" disabled value="an input value" />
    </div>
  )
  let input

  beforeEach(() => {
    input = mount(<Input />)
  })

  afterEach(unmount)

  it('should log the tree of the node', () => {
    const spy = jest.spyOn(console, 'log').mockImplementationOnce(() => {})

    input.logTree()

    expect(spy).toHaveBeenCalledTimes(1)
    const [[firstArg]] = spy.mock.calls
    expect(firstArg).toMatchInlineSnapshot(`
"[36m<div>[39m
  [36m<div>[39m
    [36m<label[39m
      [33mfor[39m=[32m\\"an-input\\"[39m
    [36m>[39m
      [0ma label[0m
    [36m</label>[39m
    [36m<input[39m
      [33mdisabled[39m=[32m\\"\\"[39m
      [33mid[39m=[32m\\"an-input\\"[39m
      [33mvalue[39m=[32m\\"an input value\\"[39m
    [36m/>[39m
  [36m</div>[39m
[36m</div>[39m"
`)
  })

  it('should return the raw dom node', () => {
    expect(input.getRawNode()).toMatchInlineSnapshot(`
<div>
  <div>
    <label
      for="an-input"
    >
      a label
    </label>
    <input
      disabled=""
      id="an-input"
      value="an input value"
    />
  </div>
</div>
`)
  })

  it('should return the text content of the node', () => {
    expect(input.getText()).toBe('a label')
  })

  it('should return the value of the node', () => {
    expect(input.getByLabelText('a label').getValue()).toBe('an input value')
  })
})
