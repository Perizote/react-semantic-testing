const EVENT_TYPES = {
  click: { interface: 'MouseEvent', type: 'click', init: { bubbles: true, cancelable: true, button: 0 } },
  submit: { interface: 'Event', type: 'submit', init: { bubbles: true, cancelable: true } },
  change: { interface: 'InputEvent', type: 'change', init: { bubbles: true } },
  mouseEnter: { interface: 'MouseEvent', type: 'mouseenter', init: { bubbles: true, cancelable: true } },
  mouseLeave: { interface: 'MouseEvent', type: 'mouseleave', init: { bubbles: true, cancelable: true } },
  focus: { interface: 'FocusEvent', type: 'focus', init: { bubbles: false, cancelable: false } },
  blur: { interface: 'FocusEvent', type: 'blur' },
  wheel: { interface: 'WheelEvent', type: 'wheel', init: { bubbles: true, cancelable: true } },
  scroll: { interface: 'UIEvent', type: 'scroll' },
  keyPress: { interface: 'KeyboardEvent', type: 'keypress', init: { bubbles: true, cancelable: true } },
  keyDown: { interface: 'KeyboardEvent', type: 'keydown', init: { bubbles: true, cancelable: true } },
}

function withEvents(node) {
  return Object.keys(EVENT_TYPES).reduce(getEventNormalizer(node), {})
}

const getEventNormalizer = node => (dispatchableEvents, eventName) => {
  const event = EVENT_TYPES[eventName]

  return {
    ...dispatchableEvents,
    [eventName]: init => {
      const eventInit = { ...event.init, ...init }
      const { target: { value } = {} } = eventInit

      if (!!value) {
        setNativeValue(node, value)
      }

      return dispatchEvent(node, event.type, event.interface, eventInit)
    },
  }
}

function dispatchEvent(node, type, eventInterface, init = {}) {
  const WindowEvent = document.defaultView[eventInterface] || document.defaultView.Event
  const event = new WindowEvent(type, init)

  return node.dispatchEvent(event)
}

function setNativeValue(node, value) {
  const prototype = Object.getPrototypeOf(node)
  const { set: prototypeValueSetter } = Object.getOwnPropertyDescriptor(prototype, 'value') || {}
  const { set: valueSetter } = Object.getOwnPropertyDescriptor(node, 'value') || {}

  if (!prototypeValueSetter && !valueSetter) {
    throw new Error('Element cannot have value property')
  }

  if (prototypeValueSetter) {
    return prototypeValueSetter.call(node, value)
  }

  valueSetter.call(node, value)
}

export { withEvents }