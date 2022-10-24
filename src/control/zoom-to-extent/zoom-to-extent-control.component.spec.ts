import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolZoomToExtentControlComponent } from './zoom-to-extent-control.component';

describe('NolZoomToExtentControlComponent', () => {
  let component: NolZoomToExtentControlComponent;
  let fixture: ComponentFixture<NolZoomToExtentControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolZoomToExtentControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolZoomToExtentControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
