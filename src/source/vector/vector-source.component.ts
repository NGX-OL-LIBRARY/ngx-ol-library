import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolVectorLayerComponent } from 'ngx-ol-library/layer/vector';
import { NolClusterSourceComponent } from 'ngx-ol-library/source/cluster';
import { NolSourceComponent } from 'ngx-ol-library/source/source';
import { Collection, Feature } from 'ol';
import { FeatureLoader, FeatureUrlFunction } from 'ol/featureloader';
import FeatureFormat from 'ol/format/Feature';
import { Geometry } from 'ol/geom';
import VectorSource, { LoadingStrategy, Options, VectorSourceEvent } from 'ol/source/Vector';

@Component({
  selector: 'nol-vector-source',
  exportAs: 'nolVectorSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolVectorSourceComponent<InstanceType extends VectorSource = VectorSource> extends NolSourceComponent<InstanceType> implements OnInit, OnChanges, Options {

  @Input() features?: Feature<Geometry>[] | Collection<Feature<Geometry>>;
  @Input() format?: FeatureFormat;
  @Input() loader?: FeatureLoader;
  @Input() overlaps?: boolean;
  @Input() strategy?: LoadingStrategy;
  @Input() url?: string | FeatureUrlFunction;
  @Input() useSpatialIndex?: boolean;

  @Output() onAddfeature = new EventEmitter<VectorSourceEvent>();
  @Output() onChangefeature = new EventEmitter<VectorSourceEvent>();
  @Output() onClear = new EventEmitter<VectorSourceEvent>();
  @Output() onFeaturesloadend = new EventEmitter<VectorSourceEvent>();
  @Output() onFeaturesloaderror = new EventEmitter<VectorSourceEvent>();
  @Output() onFeaturesloadstart = new EventEmitter<VectorSourceEvent>();
  @Output() onRemovefeature = new EventEmitter<VectorSourceEvent>();

  constructor(
    @Optional() @Host() clusterSourceHost?: NolClusterSourceComponent,
    @Optional() @Host() vectorLayerHost?: NolVectorLayerComponent
  ) { 
    super(clusterSourceHost as any || vectorLayerHost);
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new VectorSource(this) as InstanceType;
    }
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
    const { loader, url, ...restChanges } = changes;
    if (this.instance && loader) {
      this.instance.setLoader(loader.currentValue);
    }
    if (this.instance && url) {
      this.instance.setUrl(url.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}
