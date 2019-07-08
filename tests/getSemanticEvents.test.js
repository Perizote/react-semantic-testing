import { withSemantic } from '../src'

describe('getSemanticEvents', () => {
  const events = [
    { eventName: 'click', eventType: 'click', nodeType: 'button' },
    { eventName: 'submit', eventType: 'submit', nodeType: 'form' },
    { eventName: 'change', eventType: 'change', nodeType: 'input' },
    { eventName: 'mouseEnter', eventType: 'mouseenter', nodeType: 'button' },
    { eventName: 'mouseLeave', eventType: 'mouseleave', nodeType: 'button' },
    { eventName: 'focus', eventType: 'focus', nodeType: 'input' },
    { eventName: 'blur', eventType: 'blur', nodeType: 'input' },
    { eventName: 'wheel', eventType: 'wheel', nodeType: 'div' },
    { eventName: 'scroll', eventType: 'scroll', nodeType: 'div' },
    { eventName: 'keyPress', eventType: 'keypress', nodeType: 'input' },
    { eventName: 'keyDown', eventType: 'keydown', nodeType: 'input' },
  ]

  function testEventType({ eventName, eventType, nodeType }) {
    it(`should dispatch a ${ eventType }`, () => {
      const eventCallback = jest.fn()
      const node = document.createElement(nodeType)
      node.addEventListener(eventType, eventCallback)

      withSemantic(node)[eventName]()

      expect(eventCallback).toHaveBeenCalledTimes(1)
    })
  }

  events.forEach(testEventType)

  it('should update the value of the node', () => {
    const eventCallback = jest.fn()
    const node = document.createElement('input')
    const value = 'an overrided value'
    node.addEventListener('change', eventCallback)
    expect(node.value).not.toBe(value)

    withSemantic(node).change({ target: { value } })

    expect(eventCallback).toHaveBeenCalledTimes(1)
    expect(node.value).toBe(value)
  })

  it('should throw an error when the element cannot have a value', () => {
    const node = document.createElement('div')

    expect(() => withSemantic(node).change({ target: { value: 'just a value' } }))
      .toThrow('Element cannot have value property')
  })

  it('should specify a different key', () => {
    const eventCallback = jest.fn()
    const node = document.createElement('input')
    const key = 'a'
    node.addEventListener('keypress', eventCallback)

    withSemantic(node).keyPress({ key })

    expect(eventCallback).toHaveBeenCalledTimes(1)
    expect(eventCallback).toHaveBeenCalledWith(expect.objectContaining({ key }))
  })
})