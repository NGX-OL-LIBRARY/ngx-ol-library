import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolVectorLayerComponent } from 'ngx-ol-library/layers/vector-layer';
import { NolSourceComponent } from 'ngx-ol-library/sources/source';
import { Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
import Cluster, { Options } from 'ol/source/Cluster';
import VectorSource, { VectorSourceEvent } from 'ol/source/Vector';

@Component({
  selector: 'nol-cluster-source',
  exportAs: 'nolClusterSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolClusterSourceComponent extends NolSourceComponent<Cluster> implements OnInit, OnChanges, Options {

  @Input() distance?: number;
  @Input() minDistance?: number;
  @Input() geometryFunction?: ((feature: Feature) => Point);
  @Input() createCluster?: ((point: Point, arg1: Array<Feature>) => Feature);
  @Input() source?: VectorSource<Geometry>;

  @Output() onAddfeature = new EventEmitter<VectorSourceEvent>();
  @Output() onChangefeature = new EventEmitter<VectorSourceEvent>();
  @Output() onClear = new EventEmitter<VectorSourceEvent>();
  @Output() onFeaturesloadend = new EventEmitter<VectorSourceEvent>();
  @Output() onFeaturesloaderror = new EventEmitter<VectorSourceEvent>();
  @Output() onFeaturesloadstart = new EventEmitter<VectorSourceEvent>();
  @Output() onRemovefeature = new EventEmitter<VectorSourceEvent>();


  constructor(@Host() vectorLayerHost: NolVectorLayerComponent) { 
    super(vectorLayerHost);
  }

  override ngOnInit(): void {
    this.instance = new Cluster(this);
    this.instance.on('addfeature', (event: VectorSourceEvent) => this.onAddfeature.emit(event));
    this.instance.on('changefeature', (event: VectorSourceEvent) => this.onChangefeature.emit(event));
    this.instance.on('clear', (event: VectorSourceEvent) => this.onClear.emit(event));
    this.instance.on('featuresloadend', (event: VectorSourceEvent) => this.onFeaturesloadend.emit(event));
    this.instance.on('featuresloaderror', (event: VectorSourceEvent) => this.onFeaturesloaderror.emit(event));
    this.instance.on('featuresloadstart', (event: VectorSourceEvent) => this.onFeaturesloadstart.emit(event));
    this.instance.on('removefeature', (event: VectorSourceEvent) => this.onRemovefeature.emit(event));
    
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { distance, minDistance, source, ...restChanges } = changes;
    if (this.instance && distance) {
      this.instance.setDistance(distance.currentValue);
    }
    if (this.instance && minDistance) {
      this.instance.setMinDistance(minDistance.currentValue);
    }
    if (this.instance && source) {
      this.instance.setSource(source.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}
