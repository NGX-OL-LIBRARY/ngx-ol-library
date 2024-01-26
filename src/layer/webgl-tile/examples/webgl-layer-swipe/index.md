---
title: Layer Swipe (WebGL)
name: webgl-layer-swipe
order: 2
---

The `nolPrerender` and `nolPostrender` events on a WebGL tile layer component 
can be used to manipulate the WebGL context before and after rendering. 
In this case, the [gl.scissor()](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/scissor) method 
is called to clip the top layer based on the position of a slider.