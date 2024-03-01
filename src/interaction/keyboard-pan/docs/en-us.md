---
category: interaction
title: KeyboardPan
name: keyboard-pan-interaction
order: 4
label: new
---

## Definition

Interaction component that allows the user to pan the map using keyboard arrows. 
Note that, although this interaction is by default included in maps, the keys can 
only be used when browser focus is on the element to which the keyboard events 
are attached. By default, this is the map div, though you can change this with 
the `keyboardEventTarget` in [Map](components/map). `document` never loses focus 
but, for any other element, focus will have to be on, and returned to, this element 
if the keys are to function. See also [KeyboardZoom](components/keyboard-zoom-interaction).
