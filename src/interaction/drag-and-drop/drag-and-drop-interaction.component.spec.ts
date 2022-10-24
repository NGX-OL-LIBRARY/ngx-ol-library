import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolDragAndDropInteractionComponent } from './drag-and-drop-interaction.component';

describe('NolDragAndDropInteractionComponent', () => {
  let component: NolDragAndDropInteractionComponent;
  let fixture: ComponentFixture<NolDragAndDropInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolDragAndDropInteractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolDragAndDropInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
