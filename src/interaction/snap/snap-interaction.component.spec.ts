import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolSnapInteractionComponent } from './snap-interaction.component';

describe('NolSnapInteractionComponent', () => {
  let component: NolSnapInteractionComponent;
  let fixture: ComponentFixture<NolSnapInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NolSnapInteractionComponent]
    });
    fixture = TestBed.createComponent(NolSnapInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
