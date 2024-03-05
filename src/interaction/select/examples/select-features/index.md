---
title: Select Features
order: 1
---

Choose between `Single-click`, `Click`, `Hover` and `Alt+Click` as the event type 
for selection in the combobox below. When using `Single-click` or `Click` you can 
hold the `Shift` key to toggle the feature in the selection.

**Note**: when `Single-click` is used double-clicks won't select features. This 
in contrast to `Click`, where a double-click will both select the feature and 
zoom the map (because of the [DoubleClickZoom](components/double-click-zoom-interaction) 
interaction component). **Note** that `Single-click` is less responsive than `Click` 
because of the delay it uses to detect double-clicks.

In this example, a listener is registered for the 
[Select](components/select-interaction) interaction's select event in order to 
update the selection status above.