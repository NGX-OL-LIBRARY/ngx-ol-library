import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolModifyInteractionComponent } from './modify-interaction.component';

describe('NolModifyInteractionComponent', () => {
  let component: NolModifyInteractionComponent;
  let fixture: ComponentFixture<NolModifyInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolModifyInteractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolModifyInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
