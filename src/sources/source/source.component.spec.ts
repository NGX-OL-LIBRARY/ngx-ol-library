import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolSourceComponent } from './source.component';

describe('NolSourceComponent', () => {
  let component: NolSourceComponent;
  let fixture: ComponentFixture<NolSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
