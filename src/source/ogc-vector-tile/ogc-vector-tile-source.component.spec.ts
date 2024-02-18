import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolOGCVectorTileSourceComponent } from './ogc-vector-tile-source.component';

describe('NolOGCVectorTileSourceComponent', () => {
  let component: NolOGCVectorTileSourceComponent;
  let fixture: ComponentFixture<NolOGCVectorTileSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolOGCVectorTileSourceComponent]
    });
    fixture = TestBed.createComponent(NolOGCVectorTileSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
