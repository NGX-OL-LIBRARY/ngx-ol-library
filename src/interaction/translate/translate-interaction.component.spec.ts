import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolTranslateInteractionComponent } from './translate-interaction.component';

describe('NolTranslateInteractionComponent', () => {
  let component: NolTranslateInteractionComponent;
  let fixture: ComponentFixture<NolTranslateInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolTranslateInteractionComponent]
    });
    fixture = TestBed.createComponent(NolTranslateInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
