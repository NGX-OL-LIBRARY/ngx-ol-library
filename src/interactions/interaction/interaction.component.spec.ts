import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolInteractionComponent } from './interaction.component';

describe('NolInteractionComponent', () => {
  let component: NolInteractionComponent;
  let fixture: ComponentFixture<NolInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolInteractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
