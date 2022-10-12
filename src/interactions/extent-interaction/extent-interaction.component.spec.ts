import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolExtentInteractionComponent } from './extent-interaction.component';

describe('NolExtentInteractionComponent', () => {
  let component: NolExtentInteractionComponent;
  let fixture: ComponentFixture<NolExtentInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolExtentInteractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolExtentInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
