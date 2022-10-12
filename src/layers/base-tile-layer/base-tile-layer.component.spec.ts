import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolBaseTileLayerComponent } from './base-tile-layer.component';

describe('NolBaseTileLayerComponent', () => {
  let component: NolBaseTileLayerComponent;
  let fixture: ComponentFixture<NolBaseTileLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolBaseTileLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolBaseTileLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
