import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolZoomToExtentControlComponent } from './zoom-to-extent-control.component';

describe('NolZoomToExtentControlComponent', () => {
  let component: NolZoomToExtentControlComponent;
  let fixture: ComponentFixture<NolZoomToExtentControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolZoomToExtentControlComponent]
    });
    fixture = TestBed.createComponent(NolZoomToExtentControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
