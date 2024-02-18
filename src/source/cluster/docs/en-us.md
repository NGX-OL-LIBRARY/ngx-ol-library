---
category: source
title: Cluster
name: cluster-source
order: 24
label: new
---

## Definition

Layer source component to cluster vector data. Works out of the box with point 
geometries. For other geometry types, or if not all geometries should be considered 
for clustering, a custom `nolGeometryFunction` property can be defined.

If the instance is disposed without also disposing the underlying source 
`setSource(null)` has to be called to remove the listener reference from the 
wrapped source.