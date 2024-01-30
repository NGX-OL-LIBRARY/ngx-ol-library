import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolGeoTIFFSourceComponent } from './geotiff-source.component';

describe('NolGeoTIFFSourceComponent', () => {
  let component: NolGeoTIFFSourceComponent;
  let fixture: ComponentFixture<NolGeoTIFFSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolGeoTIFFSourceComponent]
    });
    fixture = TestBed.createComponent(NolGeoTIFFSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
