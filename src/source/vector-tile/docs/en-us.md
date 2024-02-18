---
category: source
title: VectorTile
name: vector-tile-source
order: 21
label: new
---

## Definition

Component for layer sources providing vector data divided into a tile grid, to be 
used with [VectorTileLayer](components/vector-tile-layer) component. Although 
this source receives tiles with vector features from the server, it is not meant 
for feature editing. Features are optimized for rendering, their geometries are 
clipped at or near tile boundaries and simplified for a view resolution. 
See [VectorSource](components/vector-source) component for vector sources that are suitable for feature 
editing.