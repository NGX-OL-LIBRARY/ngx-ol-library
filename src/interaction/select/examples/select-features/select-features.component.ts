import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolSelectInteractionModule } from 'ngx-ol-library/interaction/select';
import { Fill, Stroke, Style } from 'ol/style';
import { Condition, altKeyOnly, click, pointerMove, singleClick } from 'ol/events/condition';
import GeoJSON from 'ol/format/GeoJSON';
import { MapBrowserEvent } from 'ol';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { StyleFunction } from 'ol/style/Style';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import Select, { SelectEvent } from 'ol/interaction/Select';

function altclick(evt: MapBrowserEvent<PointerEvent>): boolean {
  return click(evt) && altKeyOnly(evt);
}

@Component({
  selector: 'nol-select-interaction-select-features-example',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    NzSpaceModule,
    NolMapModule,
    NolViewModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolSelectInteractionModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-vector-layer [nolBackground]="'white'" [nolStyle]="style">
        <nol-vector-source
          [nolUrl]="'https://openlayers.org/data/vector/ecoregions.json'"
          [nolFormat]="format"
        />
      </nol-vector-layer>
      @for (condition of conditions; track condition.value) {
        @if(condition.value === selectedCondition) {
          <nol-select-interaction
            [nolStyle]="selectedStyle"
            [nolCondition]="condition.value"
            (nolSelect)="onSelect($event)"
          />
        }
      }
    </nol-map>
    <nz-space nzAlign="center">
      <span *nzSpaceItem>Action type</span>
      <span *nzSpaceItem>
        <nz-select [(ngModel)]="selectedCondition">
          @for (condition of conditions; track condition.value) {
            <nz-option
              [nzLabel]="condition.name"
              [nzValue]="condition.value"
            />
          }
        </nz-select>
      </span>
      <span *nzSpaceItem>{{ selected }} selected features (last operation selected {{ lastSelected }} and deselected {{ lastDeselected }} features)</span>
    </nz-space>
  `,
  styles: [
    `
      :host {
        nz-space {
          margin-top: 16px;
        }

        nz-select {
          width: 120px;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolSelectInteractionSelectFeaturesExampleComponent {
  
  readonly format = new GeoJSON();

  readonly style = this.createStyle(false);
  readonly selectedStyle = this.createStyle(true);

  readonly conditions: Array<{ name: string, value: Condition }> = [
    { name: 'Click', value: click, },
    { name: 'Single-click',value: singleClick, },
    { name: 'Hover',value: pointerMove, },
    { name: 'Alt+Click',value: altclick }
  ];

  selectedCondition: Condition = click;
  selected = 0;
  lastSelected = 0;
  lastDeselected = 0;

  onSelect(event: SelectEvent): void {
    console.log(event);
    const select = event.target as Select;
    this.selected = select.getFeatures().getLength();
    this.lastSelected = event.selected.length;
    this.lastDeselected = event.deselected.length;
  }

  private createStyle(selected: boolean): StyleFunction {
    return (feature) => {
      const style = new Style({
        fill: new Fill({
          color: feature.get('COLOR') || '#eeeeee',
        }),
      });

      if (selected) {
        style.setStroke(
          new Stroke({
            color: 'rgba(255, 255, 255, 0.7)',
            width: 2,
          })
        );
      }

      return style;
    };
  }

}
