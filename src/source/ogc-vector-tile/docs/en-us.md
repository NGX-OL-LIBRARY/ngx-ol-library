---
category: source
title: OGCVectorTile
name: ogc-vector-tile-source
order: 22
label: new
---

## Definition

Layer source component for map tiles from an [OGC API - Tiles](https://ogcapi.ogc.org/tiles/) 
service that provides "vector" type tiles. The service must conform to at least 
the core (http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/core) and tileset 
(http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/tileset) conformance classes.

Vector tile sets may come in a variety of formats (e.g. GeoJSON, MVT). The `nolFormat` 
property is used to determine which of the advertised media types is used. If you 
need to force the use of a particular media type, you can provide the `nolMediaType` property.

