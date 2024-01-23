---
title: Single Image WMS
name: simple
order: 1
---

ImageWMS source component can be used as an Image layer, as shown here, or as a Tile layer, as shown in the Tiled WMS example. Tiles can be cached, so the browser will not re-fetch data for areas that were viewed already. But there may be problems with repeated labels for WMS servers that are not aware of tiles, in which case single image WMS will produce better cartography.