import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolDragPanInteractionComponent } from './drag-pan-interaction.component';

describe('NolDragPanInteractionComponent', () => {
  let component: NolDragPanInteractionComponent;
  let fixture: ComponentFixture<NolDragPanInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolDragPanInteractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolDragPanInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
