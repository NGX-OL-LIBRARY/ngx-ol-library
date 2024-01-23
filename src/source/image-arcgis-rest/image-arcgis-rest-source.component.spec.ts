import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolImageArcGISRestSourceComponent } from './image-arcgis-rest-source.component';

describe('NolImageArcGISRestSourceComponent', () => {
  let component: NolImageArcGISRestSourceComponent;
  let fixture: ComponentFixture<NolImageArcGISRestSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolImageArcGISRestSourceComponent]
    });
    fixture = TestBed.createComponent(NolImageArcGISRestSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
