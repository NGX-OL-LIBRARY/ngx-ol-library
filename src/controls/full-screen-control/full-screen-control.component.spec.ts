import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolFullScreenControlComponent } from './full-screen-control.component';

describe('NolFullScreenControlComponent', () => {
  let component: NolFullScreenControlComponent;
  let fixture: ComponentFixture<NolFullScreenControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolFullScreenControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolFullScreenControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
