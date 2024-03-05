---
title: Freehand Drawing
order: 4
---
This example demonstrates the [Draw](components/draw-interaction) in freehand 
mode. During freehand drawing, points are added while dragging. 
Set `[nolFreehand]="true"` to enable freehand mode. Note that freehand mode can 
be conditionally enabled by using the `nolFreehandCondition` property. For example 
to toggle freehand mode with the Shift key, use `[nolFreehandCondition]="shiftKeyOnly"`.