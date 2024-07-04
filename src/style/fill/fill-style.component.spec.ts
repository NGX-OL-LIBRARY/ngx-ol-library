import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolFillStyleComponent } from './fill-style.component';

describe('NolFillStyleComponent', () => {
  let component: NolFillStyleComponent;
  let fixture: ComponentFixture<NolFillStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NolFillStyleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolFillStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
