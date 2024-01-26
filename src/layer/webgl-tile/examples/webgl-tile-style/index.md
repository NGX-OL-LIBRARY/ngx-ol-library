---
title: WebGL Tile Layer Styles
name: webgl-tile-style
order: 3
---

The `nolStyle` property of a WebGL tile layer component can be used to adjust 
properties like `exposure`, `contrast`, and `saturation`. Typically those values 
would be set to numeric constants to apply a filter to imagery. In this example, 
the style properties are set to variables that can be updated based on application 
state. Adjusting the sliders results to update `nolStyleVariables` property to 
use new values for the associated style properties.