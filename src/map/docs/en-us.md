---
category: general
title: Map
order: 1
label: new
---

## Definition
> The map is the core component of OpenLayers.

## When To Use
Display a map in the application.

## Import Module
```
import { NolMapModule } from 'ngx-ol-library/map';
```

## How To Use
For a map to render, a view, one or more layers, and a target container are needed:

```
<nol-map height="400px">
  <nol-view [center]="[0, 0]" [zoom]="2"></nol-view>
  <nol-tile-layer>
    <nol-osm-source></nol-osm-source>
  </nol-tile-layer>
</nol-map>
```

The above snippet creates a map using a [nol-tile-layer](/en-us/components/tile-layer) component to display [OSM](/en-us/components/osm-source) data and render it.