import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolUTFGridSourceComponent } from './utf-grid-source.component';

describe('NolUTFGridSourceComponent', () => {
  let component: NolUTFGridSourceComponent;
  let fixture: ComponentFixture<NolUTFGridSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolUTFGridSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolUTFGridSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
