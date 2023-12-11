import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolXYZSourceComponent } from './xyz-source.component';

describe('NolXYZSourceComponent', () => {
  let component: NolXYZSourceComponent;
  let fixture: ComponentFixture<NolXYZSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NolXYZSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolXYZSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
