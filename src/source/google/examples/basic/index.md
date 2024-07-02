---
title: Google Maps
name: basic
order: 1
---

This example demonstrates how to display tiles from Google's Map Tiles API in a map. 
To use the Google Map Tiles API, you need to set up a Google Cloud project and create 
an API key for your application. See the [Map Tiles API documentation](https://developers.google.com/maps/documentation/tile/overview) for instructions.
The `nol-google-source` component can be used with a tile layer and is configured 
by passing properties to the constructor that are used in creating the [session token request](https://developers.google.com/maps/documentation/tile/session_tokens) 
for accessing the tiles. The `mapType` defaults to `'roadmap'` and can be changed 
to any of the [supported map types](https://developers.google.com/maps/documentation/tile/session_tokens#required_fields).
When using the Google source, please make sure you comply with the Google [Map Tiles API Policies](https://developers.google.com/maps/documentation/tile/policies), 
by adding the [Google logo](https://developers.google.com/maps/documentation/tile/policies#logo) in the bottom-left corner of the map. 
You can add the logo as a static image by using a custom OpenLayers control, as shown in the example below.