import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolModifyInteractionComponent } from './modify-interaction.component';

describe('NolModifyInteractionComponent', () => {
  let component: NolModifyInteractionComponent;
  let fixture: ComponentFixture<NolModifyInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolModifyInteractionComponent]
    });
    fixture = TestBed.createComponent(NolModifyInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
