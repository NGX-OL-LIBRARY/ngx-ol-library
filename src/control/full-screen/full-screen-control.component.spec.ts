import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolFullScreenControlComponent } from './full-screen-control.component';

describe('NolFullScreenControlComponent', () => {
  let component: NolFullScreenControlComponent;
  let fixture: ComponentFixture<NolFullScreenControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolFullScreenControlComponent]
    });
    fixture = TestBed.createComponent(NolFullScreenControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
