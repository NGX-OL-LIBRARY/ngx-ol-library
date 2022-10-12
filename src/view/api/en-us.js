module.exports = [
  {
    type: 'component',
    name: 'nol-view',
    properties: [
      {
        name: '[center]',
        type: 'Coordinate',
        description: 'The initial center for the view. If a user projection is not set, the coordinate system for the center is specified with the ```projection``` option. Layer sources will not be fetched if this is not set, but the center can be set later.',
      },
      {
        name: '[constrainRotation]',
        type: 'boolean | number',
        default: true,
        description: 'Rotation constraint. ```false``` means no constraint. ```true``` means no constraint, but snap to zero near zero. A number constrains the rotation to that number of values. For example, ```4``` will constrain the rotation to 0, 90, 180, and 270 degrees.',
      },
      {
        name: '[enableRotation]',
        type: 'boolean',
        default: true,
        description: 'Enable rotation. If ```false```, a rotation constraint that always sets the rotation to zero is used. The ```constrainRotation``` option has no effect if ```enableRotation``` is ```false```.',
      },
      {
        name: '[extent]',
        type: 'Extent',
        description: 'The extent that constrains the view, in other words, nothing outside of this extent can be visible on the map.',
      },
      {
        name: '[constrainOnlyCenter]',
        type: 'boolean',
        default: false,
        description: 'If true, the extent constraint will only apply to the view center and not the whole extent.',
      },
      {
        name: '[smoothExtentConstraint]',
        type: 'boolean',
        default: true,
        description: 'If true, the extent constraint will be applied smoothly, i.e. allow the view to go slightly outside of the given ```extent```.',
      },
      {
        name: '[maxResolution]',
        type: 'number',
        description: 'The maximum resolution used to determine the resolution constraint. It is used together with ```minResolution``` (or ```maxZoom```) and ```zoomFactor```. If unspecified it is calculated in such a way that the projection\'s validity extent fits in a ```256x256``` px tile. If the projection is Spherical ```Mercator``` (the default) then ```maxResolution``` defaults to ```40075016.68557849 / 256 = 156543.03392804097```.',
      },
      {
        name: '[minResolution]',
        type: 'number',
        description: 'The minimum resolution used to determine the resolution constraint. It is used together with ```maxResolution``` (or ```minZoom```) and ```zoomFactor```. If unspecified it is calculated assuming 29 zoom levels (with a factor of 2). If the projection is Spherical ```Mercator``` (the default) then ```minResolution``` defaults to ```40075016.68557849 / 256 / Math.pow(2, 28) = 0.0005831682455839253```.',
      },
      {
        name: '[maxZoom]',
        type: 'number',
        default: 28,
        description: 'The maximum zoom level used to determine the resolution constraint. It is used together with ```minZoom``` (or ```maxResolution```) and ```zoomFactor```. Note that if ```minResolution``` is also provided, it is given precedence over ```maxZoom```.',
      },
      {
        name: '[minZoom]',
        type: 'number',
        default: 0,
        description: 'The minimum zoom level used to determine the resolution constraint. It is used together with ```maxZoom``` (or ```minResolution```) and ```zoomFactor```. Note that if ```maxResolution``` is also provided, it is given precedence over ```minZoom```.',
      },
      {
        name: '[multiWorld]',
        type: 'boolean',
        default: false,
        description: 'If ```false``` the view is constrained so only one world is visible, and you cannot pan off the edge. If ```true``` the map may show multiple worlds at low zoom levels. Only used if the ```projection``` is global. Note that if ```extent``` is also provided it is given precedence.',
      },
      {
        name: '[constrainResolution]',
        type: 'boolean',
        default: false,
        description: 'If true, the view will always animate to the closest zoom level after an interaction; false means intermediary zoom levels are allowed.',
      },
      {
        name: '[smoothResolutionConstraint]',
        type: 'boolean',
        default: true,
        description: 'If true, the resolution min/max values will be applied smoothly, i. e. allow the view to exceed slightly the given resolution or zoom bounds.',
      },
      {
        name: '[showFullExtent]',
        type: 'boolean',
        default: false,
        description: 'Allow the view to be zoomed out to show the full configured extent. By default, when a view is configured with an extent, users will not be able to zoom out so the viewport exceeds the extent in either dimension. This means the full extent may not be visible if the viewport is taller or wider than the aspect ratio of the configured extent. If showFullExtent is true, the user will be able to zoom out so that the viewport exceeds the height or width of the configured extent, but not both, allowing the full extent to be shown.',
      },
      {
        name: '[projection]',
        type: 'ProjectionLike',
        default: 'EPSG:3857',
        description: 'The projection. The default is Spherical Mercator.',
      },
      {
        name: '[resolution]',
        type: 'number',
        description: 'The initial resolution for the view. The units are ```projection``` units per pixel (e.g. meters per pixel). An alternative to setting this is to set ```zoom```. Layer sources will not be fetched if neither this nor ```zoom``` are defined, but they can be set later with update ```zoom``` or ```resolution``` properties.',
      },
      {
        name: '[resolutions]',
        type: 'Array.<number>',
        description: 'Resolutions that determine the zoom levels if specified. The index in the array corresponds to the zoom level, therefore the resolution values have to be in descending order. It also constrains the resolution by the minimum and maximum value. If set the ```maxResolution```, ```minResolution```, ```minZoom```, ```maxZoom```, and ```zoomFactor``` options are ignored.',
      },
      {
        name: '[rotation]',
        type: 'number',
        default: 0,
        description: 'The initial rotation for the view in radians (positive rotation clockwise, 0 means North).',
      },
      {
        name: '[zoom]',
        type: 'number',
        description: 'Only used if ```resolution``` is not defined. Zoom level used to calculate the initial resolution for the view.',
      },
      {
        name: '[zoomFactor]',
        type: 'number',
        default: 2,
        description: 'The zoom factor used to compute the corresponding resolution.',
      },
      {
        name: '[padding]',
        type: 'Array.<number>',
        default:  `[0, 0, 0, 0]`,
        description: 'Padding (in css pixels). If the map viewport is partially covered with other content (overlays) along its edges, this setting allows to shift the center of the viewport away from that content. The order of the values is top, right, bottom, left.',
      },
      {
        name: '[enableChangesAnimation]',
        type: 'boolean',
        default: false,
        description: 'If true, the view\'s ```center```, ```zoom``` (or ```resolution```), and ```rotation``` can be animated for smooth transitions between view states.',
      },
      {
        name: '(onChange)',
        type: 'EventEmitter<BaseEvent>',
        description: 'Generic change event. Triggered when the revision counter is increased.'
      },
      {
        name: '(onCenterChange)',
        type: 'EventEmitter<ObjectEvent>',
        description: 'Triggered when the ```center``` of the view state is changed.'
      },
      {
        name: '(onResolutionChange)',
        type: 'EventEmitter<ObjectEvent>',
        description: 'Triggered when the ```resolution``` of the view state is changed.'
      },
      {
        name: '(onRotationChange)',
        type: 'EventEmitter<ObjectEvent>',
        description: 'Triggered when the ```rotation``` of the view state is changed.'
      },
      {
        name: '(onError)',
        type: 'EventEmitter<BaseEvent>',
        description: 'Generic error event. Triggered when an error occurs.'
      },
      {
        name: '(onPropertyChange)',
        type: 'EventEmitter<ObjectEvent>',
        description: 'Triggered when a property is changed.'
      },
    ]
  }
];