---
title: Bing Maps
name: sample
order: 1
---

When the Bing Maps tile service doesn't have tiles for a given resolution 
and region it returns "placeholder" tiles by default for `Aerial` 
and `OrdnanceSurvey' styles. If you want OpenLayers to display stretched tiles 
in place of "placeholder" tiles at zoom levels where Bing Maps does not have tiles 
available then bind `nolPlaceholderTiles` property of component to false.