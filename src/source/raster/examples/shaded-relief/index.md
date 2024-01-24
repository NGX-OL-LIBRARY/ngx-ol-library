---
title: Shaded Relief
name: shaded-relief
order: 5
---

This example uses a [Raster](/components/raster/overivew) source component 
to generate data based on another source. The raster source accepts any number 
of input sources (tile or image based) and runs a pipeline of operations 
on the input data. The return from the final operation is used as the data 
for the output source.

In this case, a single tiled source of elevation data is used as input. 
The shaded relief is calculated in a single "image" operation. By setting 
`[nolOperationType] = "'image'"` on the raster source component, operations 
are called with an `ImageData` object for each of the input sources. 
Operations are also called with a general purpose data object. In this example, 
the sun elevation and azimuth data from the inputs above are assigned to 
this data object and accessed in the shading operation. The shading operation 
returns an array of `ImageData` objects. When the raster source is used 
by an image layer, the first `ImageData` object returned by the last operation 
in the pipeline is used for rendering.