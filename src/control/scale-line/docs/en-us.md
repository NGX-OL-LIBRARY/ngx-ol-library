---
category: control
title: ScaleLine
name: scale-line-control
order: 6
label: new
---

## Definition

A control component displaying rough y-axis distances, calculated for the center 
of the viewport. For conformal projections (e.g. EPSG:3857, the default view 
projection in OpenLayers), the scale is valid for all directions. No scale line 
will be shown when the y-axis distance of a pixel at the viewport center cannot be 
calculated in the view projection. By default the scale line will show in the 
bottom left portion of the map, but this can be changed by using the css selector 
`.ol-scale-line`. When specifying `nolBar` as `true`, a scalebar will be rendered 
instead of a scaleline.
