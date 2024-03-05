---
category: interaction
title: Pointer
name: pointer-interaction
order: 8
label: new
---

## Definition

Base component that calls user-defined functions on `down`, `move` and `up` 
events. This component also manages "drag sequences".

When the `nolHandleDownEvent` user function returns `true` a drag sequence is 
started. During a drag sequence the `handleDragEvent` user function is called 
on `move` events. The drag sequence ends when the `handleUpEvent` user function 
is called and returns `false`.
