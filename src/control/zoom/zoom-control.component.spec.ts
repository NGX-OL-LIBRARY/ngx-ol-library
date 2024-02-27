import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolZoomControlComponent } from './zoom-control.component';

describe('NolZoomControlComponent', () => {
  let component: NolZoomControlComponent;
  let fixture: ComponentFixture<NolZoomControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolZoomControlComponent]
    });
    fixture = TestBed.createComponent(NolZoomControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
