import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolStamenSourceComponent } from './stamen-source.component';

describe('NolStamenSourceComponent', () => {
  let component: NolStamenSourceComponent;
  let fixture: ComponentFixture<NolStamenSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolStamenSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolStamenSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
