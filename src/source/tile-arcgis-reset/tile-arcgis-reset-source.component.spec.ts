import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolTileArcGISRestSourceComponent } from './tile-arcgis-reset-source.component';

describe('NolTileArcGISRestSourceComponent', () => {
  let component: NolTileArcGISRestSourceComponent;
  let fixture: ComponentFixture<NolTileArcGISRestSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolTileArcGISRestSourceComponent]
    });
    fixture = TestBed.createComponent(NolTileArcGISRestSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
