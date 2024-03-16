---
category: interaction
title: Snap
name: snap-interaction
order: 18
label: new
---

## Definition

An interaction component that handles snapping of vector features while modifying 
or drawing them. The features can come from a VectorSource or Collection Any 
interaction object that allows the user to interact with the features using the 
mouse can benefit from the snapping, as long as it is added before.

The snap interaction modifies map browser event `coordinate` and `pixel` properties 
to force the snap to occur to any interaction that them.