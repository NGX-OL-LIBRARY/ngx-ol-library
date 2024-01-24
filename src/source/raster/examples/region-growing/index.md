---
title: Region Growing
name: region-growing
order: 3
---

Click a region on the map. The computed region will be red.

This example uses a [Raster](/components/raster/overivew) source component 
to generate data based on another source. The raster source accepts any 
number of input sources (tile or image based) and runs a pipeline of operations 
on the input data. The return from the final operation is used as the data for 
the output source.

In this case, a single tiled source of imagery data is used as input. 
The region is calculated in a single "image" operation using the "seed" pixel 
provided by the user clicking on the map. The value of "nolThreshold" property 
determines whether a given contiguous pixel belongs to the "region" - the 
difference between a candidate pixel's RGB values and the seed values must be 
below the threshold.

This example also shows how an additional function can be made available to the operation.