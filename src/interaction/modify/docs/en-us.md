---
category: interaction
title: Modify
name: modify-interaction
order: 15
label: new
---

## Definition

An interaction component for modifying feature geometries. To modify features 
that have been added to an existing source, construct the modify interaction 
with the `nolSource` property. If you want to modify features in a collection 
(for example, the collection used by a select interaction), construct the 
interaction with the `nolFeatures` property. The interaction must be constructed 
with either a `nolSource` or `nolFeatures` property.

Cartesian distance from the pointer is used to determine the features that will 
be modified. This means that geometries will only be considered for modification 
when they are within the configured `nolPixelTolerance`. For point geometries, 
the `nolHitDetection` property can be used to match their visual appearance.

By default, the interaction will allow deletion of vertices when the `alt` key 
is pressed. To configure the interaction with a different condition for deletion, 
use the `nolDeleteCondition` property.
