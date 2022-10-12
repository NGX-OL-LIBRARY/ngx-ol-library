import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolPointerInteractionComponent } from './pointer-interaction.component';

describe('NolPointerInteractionComponent', () => {
  let component: NolPointerInteractionComponent;
  let fixture: ComponentFixture<NolPointerInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolPointerInteractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolPointerInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
