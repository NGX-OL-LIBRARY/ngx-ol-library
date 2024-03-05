import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolSelectInteractionComponent } from './select-interaction.component';

describe('NolSelectInteractionComponent', () => {
  let component: NolSelectInteractionComponent;
  let fixture: ComponentFixture<NolSelectInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolSelectInteractionComponent]
    });
    fixture = TestBed.createComponent(NolSelectInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
