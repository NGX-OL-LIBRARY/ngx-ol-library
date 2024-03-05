---
category: interaction
title: Select
name: select-interaction
order: 21
label: new
---

## Definition

An interaction component for selecting vector features. By default, selected 
features are styled differently, so this interaction can be used for visual 
highlighting, as well as selecting features for other actions, such as 
modification or output. There are three ways of controlling which features are 
selected: using the browser event as defined by the `nolCondition` and optionally 
the `nolToggleCondition`, `nolAddCondition`/`nolRemoveCondition`, and `nolMulti` 
properties; a `nolLayers` filter property; and a further feature filter using 
the `nolFilter` property.
