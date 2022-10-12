import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolRotateControlComponent } from './rotate-control.component';

describe('NolRotateControlComponent', () => {
  let component: NolRotateControlComponent;
  let fixture: ComponentFixture<NolRotateControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolRotateControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolRotateControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
