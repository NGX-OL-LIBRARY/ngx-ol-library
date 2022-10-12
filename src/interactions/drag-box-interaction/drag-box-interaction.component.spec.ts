import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolDragBoxInteractionComponent } from './drag-box-interaction.component';

describe('NolDragBoxInteractionComponent', () => {
  let component: NolDragBoxInteractionComponent;
  let fixture: ComponentFixture<NolDragBoxInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolDragBoxInteractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolDragBoxInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
