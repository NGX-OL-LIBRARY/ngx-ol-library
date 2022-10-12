import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolSelectInteractionComponent } from './select-interaction.component';

describe('NolSelectInteractionComponent', () => {
  let component: NolSelectInteractionComponent;
  let fixture: ComponentFixture<NolSelectInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolSelectInteractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolSelectInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
