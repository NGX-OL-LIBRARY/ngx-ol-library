import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolTileArcGISRestSourceComponent } from './tile-arcgis-rest-source.component';

describe('NolTileArcGISRestSourceComponent', () => {
  let component: NolTileArcGISRestSourceComponent;
  let fixture: ComponentFixture<NolTileArcGISRestSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolTileArcGISRestSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolTileArcGISRestSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
