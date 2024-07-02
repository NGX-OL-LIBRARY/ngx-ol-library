# ngx-ol-library

ngx-ol-library is a components library that brings the high-performance, feature-packed OpenLayers to the World of Angular. 

And makes it easy to put a dynamic map in any Angular application. It can display maps with tiled, raster or vector layers loaded from different sources.

## Dependencies
ngx-ol-library works with the following versions which must be installed as peer dependencies: 

| ngx-ol-library | Angular        | Openlayers     |
|----------------|----------------|----------------|
| 1.0.x          | ^18.0.0        | ^9.2.4         |
| 0.x            | ^17.0.0        | ^8.2.0         |


## Installation

Ensure that you have created a new project with `@angular/cli` and installed the `ol` peer dependency.

```bash
$ npm install ngx-ol-library --save
# Or if you use yarn
$ yarn add ngx-ol-library
```

## Import Styles

Import the OpenLayers pre-built stylesheet in `angular.json`

```diff
{
  "styles": [
+    "node_modules/ol/ol.css"
  ]
}
```

## Import Component Module

Finally, you need to import the component modules that you want to use into the app.module.ts file and [feature modules](https://angular.io/guide/feature-modules).

```ts
import { NgModule } from '@angular/core';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NolMapModule,
    NolViewModule
  ]
})
export class AppModule {}
```

If you are using standalone components, you can import the `ngx-ol-library` components in the standalone component that needs to display the map.

```ts
import { Component } from '@angular/core';
import { NolTileLayerComponent } from 'ngx-ol-library/layer/tile';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolOSMSourceComponent } from 'ngx-ol-library/source/osm';
import { NolViewComponent } from 'ngx-ol-library/view';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NolMapComponent,
    NolViewComponent,
    NolTileLayerComponent,
    NolOSMSourceComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
```