module.exports = [
  {
    type: 'component',
    name: 'nol-map',
    properties: [
      {
        name: '[controls]',
        type: '	Collection<Control> | Array<Control>',
        description: 'Controls initially added to the map. If not specified, [defaults](https://openlayers.org/en/latest/apidoc/module-ol_control_defaults.html#.defaults) is used.'
      },
      {
        name: '[pixelRatio]',
        type: 'number',
        default: 'window.devicePixelRatio',
        description: 'The ratio between physical pixels and device-independent pixels (dips) on the device.'
      },
      {
        name: '[interactions]',
        type: 'Collection<Interaction> | Array<Interaction>',
        description: 'Interactions that are initially added to the map. If not specified, [defaults](https://openlayers.org/en/latest/apidoc/module-ol_interaction_defaults.html#.defaults) is used.'
      },
      {
        name: '[keyboardEventTarget]',
        type: 'HTMLElement | Document | string',
        description: 'The element to listen to keyboard events on. This determines when the ```KeyboardPan``` and ```KeyboardZoom``` interactions trigger. For example, if this option is set to ```document``` the keyboard interactions will always trigger. If this option is not specified, the element the library listens to keyboard events on is the map target (i.e. the user-provided div for the map). If this is not ```document```, the target element needs to be focused for key events to be emitted, requiring that the target element has a ```tabindex``` attribute.'
      },
      {
        name: '[layers]',
        type: 'Array<BaseLayer> | Collection<BaseLayer> | LayerGroup',
        description: 'Layers. If this is not defined, a map with no layers will be rendered. Note that layers are rendered in the order supplied, so if you want, for example, a vector layer to appear on top of a tile layer, it must come after the tile layer.'
      },
      {
        name: '[maxTilesLoading]',
        type: 'number',
        default: 16,
        description: 'Maximum number tiles to load simultaneously.'
      },
      {
        name: '[moveTolerance]',
        type: 'number',
        default: 1,
        description: 'The minimum distance in pixels the cursor must move to be detected as a map move event instead of a click. Increasing this value can make it easier to click on the map.'
      },
      {
        name: '[overlays]',
        type: 'Collection<Overlay> | Array<Overlay>',
        description: 'Overlays initially added to the map. By default, no overlays are added.'
      },
      {
        name: '[target]',
        type: 'HTMLElement | string',
        description: 'The container for the map, either the element itself or the id of the element. If not specified at construction time, [setTarget](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#setTarget) must be called for the map to be rendered. If passed by element, the container can be in a secondary document.'
      },
      {
        name: '[view]',
        type: 'View | Promise<ViewOptions>',
        description: 'The map\'s view. No layer sources will be fetched unless this is specified at construction time or through [setView](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#setView).'
      },
      {
        name: '(onChange)',
        type: 'EventEmitter<BaseEvent>',
        description: 'Generic change event. Triggered when the revision counter is increased.'
      },
      {
        name: '(onLayerGroupChange)',
        type: 'EventEmitter<ObjectEvent>',
        description: 'Triggered when layer group changed.'
      },
      {
        name: '(onSizeChange)',
        type: 'EventEmitter<ObjectEvent>',
        description: 'Triggered when map size changed.'
      },
      {
        name: '(onTargetChange)',
        type: 'EventEmitter<ObjectEvent>',
        description: 'Triggered when map target element changed.'
      },
      {
        name: '(onViewChange)',
        type: 'EventEmitter<ObjectEvent>',
        description: 'Triggered when map view changed.'
      },
      {
        name: '(onClick)',
        type: 'EventEmitter<MapBrowserEvent>',
        description: 'A click with no dragging. A double click will fire two of this.'
      },
      {
        name: '(onDblclick)',
        type: 'EventEmitter<MapBrowserEvent>',
        description: 'A true double click, with no dragging.'
      },
      {
        name: '(onError)',
        type: 'EventEmitter<BaseEvent>',
        description: 'Generic error event. Triggered when an error occurs.'
      },
      {
        name: '(onLoadend)',
        type: 'EventEmitter<MapEvent>',
        description: 'Triggered when loading of additional map data has completed.'
      },
      {
        name: '(onLoadstart)',
        type: 'EventEmitter<MapEvent>',
        description: 'Triggered when loading of additional map data (tiles, images, features) starts.'
      },
      {
        name: '(onMoveend)',
        type: 'EventEmitter<MapEvent>',
        description: 'Triggered after the map is moved.'
      },
      {
        name: '(onMovestart)',
        type: 'EventEmitter<MapEvent>',
        description: 'Triggered when the map starts moving.'
      },
      {
        name: '(onPointerdrag)',
        type: 'EventEmitter<MapBrowserEvent>',
        description: 'Triggered when a pointer is dragged.'
      },
      {
        name: '(onPointermove)',
        type: 'EventEmitter<MapBrowserEvent>',
        description: 'Triggered when a pointer is moved. Note that on touch devices this is triggered when the map is panned, so is not the same as mousemove.'
      },
      {
        name: '(onPostcompose)',
        type: 'EventEmitter<RenderEvent>',
        description: 'Triggered after layers are composed. When dispatched by the map, the event object will not have a context set. When dispatched by a layer, the event object will have a context set. Only WebGL layers currently dispatch this event.'
      },
      {
        name: '(onPostrender)',
        type: 'EventEmitter<MapEvent>',
        description: 'Triggered after a map frame is rendered.'
      },
      {
        name: '(onPrecompose)',
        type: 'EventEmitter<RenderEvent>',
        description: 'Triggered before layers are composed. When dispatched by the map, the event object will not have a context set. When dispatched by a layer, the event object will have a context set. Only WebGL layers currently dispatch this event.'
      },
      {
        name: '(onPropertychange)',
        type: 'EventEmitter<ObjectEvent>',
        description: 'Triggered when a property is changed.'
      },
      {
        name: '(onRendercomplete)',
        type: 'EventEmitter<RenderEvent>',
        description: 'Triggered when rendering is complete, i.e. all sources and tiles have finished loading for the current viewport, and all tiles are faded in. The event object will not have a context set.'
      },
      {
        name: '(onSingleclick)',
        type: 'EventEmitter<MapBrowserEvent>',
        description: 'A true single click with no dragging and no double click. Note that this event is delayed by 250 ms to ensure that it is not a double click.'
      },
    ]
  }
];