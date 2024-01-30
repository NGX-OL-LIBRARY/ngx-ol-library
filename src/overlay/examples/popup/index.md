---
title: Popup
name: popup
order: 2
---

Click on the map to get a popup. The popup is composed of a few basic elements: 
a container, a close button, and a place for the content. To anchor the popup to the map, 
an `nol-overlay` component is created with the popup container. A listener 
is registered for the map's click event to display the popup, and another 
listener is set as the click handler for the close button to hide the popup.

