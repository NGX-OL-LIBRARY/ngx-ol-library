import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolKeyboardPanInteractionComponent } from './keyboard-pan-interaction.component';

describe('NolKeyboardPanInteractionComponent', () => {
  let component: NolKeyboardPanInteractionComponent;
  let fixture: ComponentFixture<NolKeyboardPanInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolKeyboardPanInteractionComponent]
    });
    fixture = TestBed.createComponent(NolKeyboardPanInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
