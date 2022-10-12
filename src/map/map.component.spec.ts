import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolMapComponent } from './map.component';

describe('NolMapComponent', () => {
  let component: NolMapComponent;
  let fixture: ComponentFixture<NolMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
