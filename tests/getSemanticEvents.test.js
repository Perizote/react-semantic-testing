// import { withSemantic } from '../src'
import React, { useState, createElement } from 'react'
import { mount, unmount } from '../examples/mounting'

describe('getSemanticEvents', () => {
  const events = [
    {
      reactEvent: 'onClick',
      eventName: 'click',
      eventType: 'click',
      nodeType: 'button'
    },
    {
      reactEvent: 'onSubmit',
      eventName: 'submit',
      eventType: 'submit',
      nodeType: 'form'
    },
    {
      reactEvent: 'onChange',
      eventName: 'change',
      eventType: 'change',
      nodeType: 'input', eventProps: {
        target: { value: 'new value' },
      },
    },
    {
      reactEvent: 'onMouseEnter',
      eventName: 'mouseOver',
      eventType: 'mouseover',
      nodeType: 'button'
    },
    {
      reactEvent: 'onMouseLeave',
      eventName: 'mouseOut',
      eventType: 'mouseout',
      nodeType: 'button'
    },
    {
      reactEvent: 'onFocus',
      eventName: 'focus',
      eventType: 'focus',
      nodeType: 'input'
    },
    {
      reactEvent: 'onBlur',
      eventName: 'blur',
      eventType: 'blur',
      nodeType: 'input'
    },
    {
      reactEvent: 'onWheel',
      eventName: 'wheel',
      eventType: 'wheel',
      nodeType: 'div'
    },
    {
      reactEvent: 'onScroll',
      eventName: 'scroll',
      eventType: 'scroll',
      nodeType: 'div'
    },
    {
      reactEvent: 'onKeyDown',
      eventName: 'keyDown',
      eventType: 'keydown',
      nodeType: 'input'
    },
  ]

  afterEach(unmount)

  function testEventType({ reactEvent, eventName, eventType, nodeType, eventProps }) {
    it(`should dispatch a ${ eventType }`, () => {
      const eventCallback = jest.fn()
      const element = createElement(nodeType, { [reactEvent]: eventCallback, 'data-test': 'element' })

      const node = mount(element)
      node.getByDataTest('element')[eventName](eventProps)

      expect(eventCallback).toHaveBeenCalledTimes(1)
    })
  }

  events.forEach(testEventType)

  it('should update the value of the node', () => {
    const Input = () => {
      const [ value, setValue ] = useState('a default value')
      const onChange = event => setValue(event.target.value)

      return <input onChange={ onChange } value={ value } />
    }
    const input = mount(<Input />)
    const changingValue = 'an overrided value'

    expect(input.getByValue('a default value')).toBeRendered()

    input.getByValue('a default value').change({ target: { value: changingValue } })

    expect(input.getByValue(changingValue)).toBeRendered()
  })

  it('should throw an error when the element cannot have a value', () => {
    const ComponentThatCantHaveValue = () => <div></div>
    const componentThatCantHaveValue = mount(<ComponentThatCantHaveValue />)

    expect(() => componentThatCantHaveValue.change({ target: { value: 'just a value' } }))
      .toThrow('Element cannot have value property')
  })

  it('should specify a different key', () => {
    const Input = () => {
      const [ value, setValue ] = useState('a default valu')
      const onKeyDown = event => setValue(value => value + event.key)

      return <input onChange={ () => null } onKeyDown={ onKeyDown } value={ value } />
    }
    const input = mount(<Input />)
    const key = 'e'

    expect(input.getByValue('a default value')).not.toBeRendered()
    input.getByValue('a default valu').keyDown({ key })
    expect(input.getByValue('a default value')).toBeRendered()
  })
})