import { withEvents, NodeWithEvents } from './withEvents'
import { withQueries, NodeWithQueries } from './withQueries'
import { withHelpers, NodeWithHelpers } from './withHelpers'
import { withMutations, NodeWithMutations } from './withMutations'

type NodeWithTools =
  & NodeWithEvents
  & NodeWithQueries
  & NodeWithHelpers
  & NodeWithMutations

type DOMNode =
  & Node
  & HTMLAnchorElement
  & HTMLAreaElement
  & HTMLAudioElement
  & HTMLBRElement
  & HTMLBodyElement
  & HTMLButtonElement
  & HTMLCanvasElement
  & HTMLDataElement
  & HTMLDataListElement
  & HTMLDivElement
  & HTMLDocument
  & HTMLElement
  & HTMLFormElement
  & HTMLHRElement
  & HTMLHeadElement
  & HTMLHtmlElement
  & HTMLIFrameElement
  & HTMLImageElement
  & HTMLInputElement
  & HTMLLIElement
  & HTMLLabelElement
  & HTMLLegendElement
  & HTMLLinkElement
  & HTMLMediaElement
  & HTMLOListElement
  & HTMLObjectElement
  & HTMLOptionElement
  & HTMLOptionsCollection
  & HTMLParagraphElement
  & HTMLSelectElement
  & HTMLSpanElement
  & HTMLTableCaptionElement
  & HTMLTableCellElement
  & HTMLTableColElement
  & HTMLTableDataCellElement
  & HTMLTableElement
  & HTMLTableHeaderCellElement
  & HTMLTableRowElement
  & HTMLTableSectionElement
  & HTMLTemplateElement
  & HTMLTextAreaElement
  & HTMLTimeElement
  & HTMLTitleElement
  & HTMLUListElement
  & HTMLVideoElement

const withTools = (node: DOMNode): NodeWithTools => ({
  ...withEvents(node),
  ...withQueries(node),
  ...withHelpers(node),
  ...withMutations(node),
})

export { withTools, NodeWithTools, DOMNode }