import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolRotateControlComponent } from './rotate-control.component';

describe('NolRotateControlComponent', () => {
  let component: NolRotateControlComponent;
  let fixture: ComponentFixture<NolRotateControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolRotateControlComponent]
    });
    fixture = TestBed.createComponent(NolRotateControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
