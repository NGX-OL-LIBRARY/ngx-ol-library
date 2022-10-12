import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolBaseObjectComponent } from './base-object.component';

describe('NolBaseObjectComponent', () => {
  let component: NolBaseObjectComponent;
  let fixture: ComponentFixture<NolBaseObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolBaseObjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolBaseObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
