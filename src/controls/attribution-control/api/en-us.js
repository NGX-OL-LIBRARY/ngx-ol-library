module.exports = [
  {
    type: 'component',
    name: 'nol-attribution-control',
    properties: [
      {
        name: '[className]',
        type: 'string',
        default: 'ol-attribution',
        description: 'CSS class name.'
      },
      {
        name: '[target]',
        type: 'HTMLElement | string',
        description: 'Specify a target if you want the control to be rendered outside of the map\'s viewport.'
      },
      {
        name: '[collapsible]',
        type: 'boolean',
        description: 'Specify if attributions can be collapsed. If not specified, sources control this behavior with their ```attributionsCollapsible``` setting.'
      },
      {
        name: '[collapsed]',
        type: 'boolean',
        description: 'Specify if attributions should be collapsed at startup.'
      },
      {
        name: '[tipLabel]',
        type: 'string',
        default: 'Attributions',
        description: 'Text label to use for the button tip.'
      },
      {
        name: '[label]',
        type: 'string | HTMLElement',
        default: 'i',
        description: 'Text label to use for the collapsed attributions button. Instead of text, also an element (e.g. a ```span``` element) can be used.'
      },
      {
        name: '[expandClassName]',
        type: 'string',
        default: 'ol-attribution-expand',
        description: 'CSS class name for the collapsed attributions button.'
      },
      {
        name: '[collapseLabel]',
        type: 'string | HTMLElement',
        default: '›',
        description: 'Text label to use for the expanded attributions button. Instead of text, also an element (e.g. a ```span``` element) can be used.'
      },
      {
        name: '[collapseClassName]',
        type: 'string',
        default: 'ol-attribution-collapse',
        description: 'CSS class name for the expanded attributions button.'
      },
      {
        name: '[render]',
        type: '(event: MapEvent) => void',
        description: 'Function called when the control should be re-rendered. This is called in a ```requestAnimationFrame``` callback.'
      },
      {
        name: '(onChange)',
        type: 'EventEmitter<BaseEvent>',
        description: 'Generic change event. Triggered when the revision counter is increased.'
      },
      {
        name: '(onError)',
        type: 'EventEmitter<BaseEvent>',
        description: 'Generic error event. Triggered when an error occurs.'
      },
      {
        name: '(onPropertychange)',
        type: 'EventEmitter<ObjectEvent>',
        description: 'Triggered when a property is changed.'
      }
    ]
  }
];