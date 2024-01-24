import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolRasterSourceComponent } from './raster-source.component';

describe('NolRasterSourceComponent', () => {
  let component: NolRasterSourceComponent;
  let fixture: ComponentFixture<NolRasterSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolRasterSourceComponent]
    });
    fixture = TestBed.createComponent(NolRasterSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
