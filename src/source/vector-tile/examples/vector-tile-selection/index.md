---
title: Vector Tile Selection
name: vector-tile-selection
order: 2
---

Click a rendered vector-tile feature to highlight it on the map. Click on an 
empty spot (ocean) to reset the selection. By changing the action type 
to "Multi Select" you can select multiple features at a time. 
With "Single Select on hover", features will be higlighted when the pointer is 
above them.

The selection layer is configured with `nolRenderMode="vector"` for better 
performance on frequent redraws, i.e. when "Single Select on hover" is selected.

