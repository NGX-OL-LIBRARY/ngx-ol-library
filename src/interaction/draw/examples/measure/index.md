---
title: Measure
order: 5
---

The `getLength()` and `getArea()` functions calculate spherical lengths and 
areas for geometries. Lengths are calculated by assuming great circle segments 
between geometry coordinates. Areas are calculated as if edges of polygons were 
great circle segments.

Note that the `geometry.getLength()` and `geometry.getArea()` methods return 
measures of projected (planar) geometries. These can be very different than 
on-the-ground measures in certain situations — in northern and southern 
latitudes using Web Mercator for example. For better results, use the functions 
in the [sphere](https://openlayers.org/en/v8.1.0/apidoc/module-ol_sphere.html) module.