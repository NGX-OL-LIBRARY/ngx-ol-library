import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolLinkInteractionComponent } from './link-interaction.component';

describe('NolLinkInteractionComponent', () => {
  let component: NolLinkInteractionComponent;
  let fixture: ComponentFixture<NolLinkInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolLinkInteractionComponent]
    });
    fixture = TestBed.createComponent(NolLinkInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
