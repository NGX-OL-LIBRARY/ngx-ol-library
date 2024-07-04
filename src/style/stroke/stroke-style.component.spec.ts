import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolStrokeStyleComponent } from './stroke-style.component';

describe('NolStrokeStyleComponent', () => {
  let component: NolStrokeStyleComponent;
  let fixture: ComponentFixture<NolStrokeStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NolStrokeStyleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolStrokeStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
