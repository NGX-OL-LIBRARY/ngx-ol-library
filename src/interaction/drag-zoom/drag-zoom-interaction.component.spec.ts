import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolDragZoomInteractionComponent } from './drag-zoom-interaction.component';

describe('NolDragZoomInteractionComponent', () => {
  let component: NolDragZoomInteractionComponent;
  let fixture: ComponentFixture<NolDragZoomInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolDragZoomInteractionComponent]
    });
    fixture = TestBed.createComponent(NolDragZoomInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
