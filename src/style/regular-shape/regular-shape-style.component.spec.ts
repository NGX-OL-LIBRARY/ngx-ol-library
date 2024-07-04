import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolRegularShapeStyleComponent } from './regular-shape-style.component';

describe('NolRegularShapeStyleComponent', () => {
  let component: NolRegularShapeStyleComponent;
  let fixture: ComponentFixture<NolRegularShapeStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NolRegularShapeStyleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolRegularShapeStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
