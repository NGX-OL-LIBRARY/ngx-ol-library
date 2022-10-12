import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolSourceOptionsComponent } from './source-options.component';

describe('NolSourceOptionsComponent', () => {
  let component: NolSourceOptionsComponent;
  let fixture: ComponentFixture<NolSourceOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolSourceOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolSourceOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
