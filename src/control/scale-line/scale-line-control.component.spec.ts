import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolScaleLineControlComponent } from './scale-line-control.component';

describe('NolScaleLineControlComponent', () => {
  let component: NolScaleLineControlComponent;
  let fixture: ComponentFixture<NolScaleLineControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolScaleLineControlComponent]
    });
    fixture = TestBed.createComponent(NolScaleLineControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
