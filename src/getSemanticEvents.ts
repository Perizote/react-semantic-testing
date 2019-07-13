import { DOMWindow } from 'jsdom'
import { DOMNode } from './utils/DOMNode'

enum EventType {
  MouseEvent = 'MouseEvent',
  Event = 'Event',
  InputEvent = 'InputEvent',
  FocusEvent = 'FocusEvent',
  WheelEvent = 'WheelEvent',
  UIEvent = 'UIEvent',
  KeyboardEvent = 'KeyboardEvent',
}

enum EventName {
  Click = 'click',
  Submit = 'submit',
  Change = 'change',
  MouseEnter = 'mouseOver',
  MouseLeave = 'mouseOut',
  Focus = 'focus',
  Blur = 'blur',
  Wheel = 'wheel',
  Scroll = 'scroll',
  KeyDown = 'keyDown',
}

type DOMEvent = {
  type: EventType,
  name: EventName,
  content?: EventInit | Event,
}

type SemanticEvents = {
  [EventName.Click]?: DOMEvent,
  [EventName.Submit]?: DOMEvent,
  [EventName.Change]?: DOMEvent,
  [EventName.MouseEnter]?: DOMEvent,
  [EventName.MouseLeave]?: DOMEvent,
  [EventName.Focus]?: DOMEvent,
  [EventName.Blur]?: DOMEvent,
  [EventName.Wheel]?: DOMEvent,
  [EventName.Scroll]?: DOMEvent,
  [EventName.KeyDown]?: DOMEvent,
}

const events: DOMEvent[] = [
  { type: EventType.MouseEvent, name: EventName.Click, content: { bubbles: true, cancelable: true } },
  { type: EventType.Event, name: EventName.Submit, content: { bubbles: true, cancelable: true } },
  { type: EventType.InputEvent, name: EventName.Change, content: { bubbles: true } },
  { type: EventType.MouseEvent, name: EventName.MouseEnter, content: { bubbles: true, cancelable: true } },
  { type: EventType.MouseEvent, name: EventName.MouseLeave, content: { bubbles: true, cancelable: true } },
  { type: EventType.FocusEvent, name: EventName.Focus },
  { type: EventType.FocusEvent, name: EventName.Blur },
  { type: EventType.WheelEvent, name: EventName.Wheel, content: { bubbles: true, cancelable: true } },
  { type: EventType.UIEvent, name: EventName.Scroll },
  { type: EventType.KeyboardEvent, name: EventName.KeyDown, content: { bubbles: true, cancelable: true } },
]

const getSemanticEvents = (node: DOMNode): SemanticEvents => events.reduce(getEventNormalizer(node), {})

const getEventNormalizer = (node: DOMNode) => (normalizedEvents: SemanticEvents, event: DOMEvent): SemanticEvents => ({
  ...normalizedEvents,
  [event.name]: (newEvent: Event): void => {
    const updatedEvent = {
      ...event,
      content: {
        ...event.content,
        ...newEvent,
      }
    }

    setNativeValue(node, updatedEvent.content)

    dispatchEvent(node, updatedEvent)
  },
})

function dispatchEvent(node: Node, event: DOMEvent): void {
  const windowEvent = createWindowEvent(event)
  if (!windowEvent) { return }

  node.dispatchEvent(windowEvent)
}

function createWindowEvent(event: DOMEvent): void | Event {
  if (!document || !document.defaultView) { return }
  if (!event || !event.type) { return }

  const window = document.defaultView as DOMWindow & { [key: string]: EventType }
  const WindowEvent = window[event.type] as (typeof Event) || window.Event
  return new WindowEvent(event.name.toLowerCase(), event.content)
}

function setNativeValue(node: DOMNode, event: Event): void | never {
  if (!event.target) { return }
  const { value } = event.target as DOMNode
  if (value === undefined) { return }

  const prototype = Object.getPrototypeOf(node)
  const { set: prototypeValueSetter }: PropertyDescriptor = Object.getOwnPropertyDescriptor(prototype, 'value') || {}
  const { set: valueSetter }: PropertyDescriptor = Object.getOwnPropertyDescriptor(node, 'value') || {}

  if (prototypeValueSetter) {
    return prototypeValueSetter.call(node, value)
  }

  if (valueSetter) {
    return valueSetter.call(node, value)
  }

  throw new Error('Element cannot have value property')
}

export { getSemanticEvents, SemanticEvents }