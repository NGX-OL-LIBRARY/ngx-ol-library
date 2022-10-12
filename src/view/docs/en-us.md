---
category: general
title: View
subtitle: 视图
order: 2
label: new
---

## Definition
> A View object represents a simple 2D view of the map. It's a nol-view component based on [View](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html) feature in OpenLayers.

## Import Module
```
import { NolViewModule } from 'ngx-ol-library/view';
```

## How To Use
This is the object to act upon to change the center, resolution, and rotation of the map.

A View has a projection. The projection determines the coordinate system of the center, and its units determine the units of the resolution (projection units per pixel). The default projection is Web Mercator (EPSG:3857).

The nol-view component needs to be nested within the nol-map component.

```
<nol-map height="500px">
  <nol-view [center]="[0, 0]" [zoom]="5"></nol-view>
  // other components...
</nol-map>
```