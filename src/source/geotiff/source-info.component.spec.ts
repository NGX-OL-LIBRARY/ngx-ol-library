import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolSourceInfoComponent } from './source-info.component';

describe('NolSourceInfoComponent', () => {
  let component: NolSourceInfoComponent;
  let fixture: ComponentFixture<NolSourceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolSourceInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolSourceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
