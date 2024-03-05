---
title: Draw Shapes
order: 2
---

This demonstrates the use of the `nolGeometryFunction` property for the 
[Draw](components/draw-interaction) interaction component. Select a shape type 
from the dropdown above to start drawing. To activate freehand drawing, hold 
the `Shift` key. Square drawing is achieved by using `nolType='Circle'` type 
with a `geometryFunction` that creates a 4-sided regular polygon instead of a 
circle. Box drawing uses `nolType='Circle'` with a geometryFunction that creates 
a box-shaped polygon instead of a circle. Star drawing uses a custom geometry 
function that converts a circle into a star using the center and radius provided 
by the [Draw](components/draw-interaction) interaction component.