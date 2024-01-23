---
title: Image Load Events
name: image-load-events
order: 2
---

Image sources fire events related to image loading. You can bind the `nolImageloadstart`, `nolImageloadend`, and `nolImageloaderror` type of output properties to monitor image loading progress. This example binds the output properties for these events and renders an image loading progress bar at the bottom of the map. The progress bar is shown and hidden according to the map's `nolLoadstart` and `nolLoadend` events.