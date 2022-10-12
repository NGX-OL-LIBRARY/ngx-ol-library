import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolDrawInteractionComponent } from './draw-interaction.component';

describe('NolDrawInteractionComponent', () => {
  let component: NolDrawInteractionComponent;
  let fixture: ComponentFixture<NolDrawInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolDrawInteractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolDrawInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
