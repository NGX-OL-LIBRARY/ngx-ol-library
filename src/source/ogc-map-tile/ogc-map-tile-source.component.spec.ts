import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolOGCMapTileSourceComponent } from './ogc-map-tile-source.component';

describe('NolOGCMapTileSourceComponent', () => {
  let component: NolOGCMapTileSourceComponent;
  let fixture: ComponentFixture<NolOGCMapTileSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolOGCMapTileSourceComponent]
    });
    fixture = TestBed.createComponent(NolOGCMapTileSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
