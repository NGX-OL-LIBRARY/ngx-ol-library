import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolDragRotateInteractionComponent } from './drag-rotate-interaction.component';

describe('NolDragRotateInteractionComponent', () => {
  let component: NolDragRotateInteractionComponent;
  let fixture: ComponentFixture<NolDragRotateInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolDragRotateInteractionComponent]
    });
    fixture = TestBed.createComponent(NolDragRotateInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
