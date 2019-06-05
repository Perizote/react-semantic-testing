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

type DOMNodeList = DOMNode[]

enum DOMAttribute {
  AriaLabel = 'aria-label',
  DataTest = 'data-test',
  Alt = 'alt',
  Role = 'role',
}

enum DOMTag {
  Label = 'label',
  Input = 'input',
  Select = 'select',
  TextArea = 'textarea',
}

export { DOMNode, DOMNodeList, DOMAttribute, DOMTag }