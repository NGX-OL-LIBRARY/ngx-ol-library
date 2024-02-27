import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolZoomSliderControlComponent } from './zoom-slider-control.component';

describe('NolZoomSliderControlComponent', () => {
  let component: NolZoomSliderControlComponent;
  let fixture: ComponentFixture<NolZoomSliderControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolZoomSliderControlComponent]
    });
    fixture = TestBed.createComponent(NolZoomSliderControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
