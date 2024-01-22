import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolLineStringGeometryComponent } from './line-string-geometry.component';

describe('NolLineStringGeometryComponent', () => {
  let component: NolLineStringGeometryComponent;
  let fixture: ComponentFixture<NolLineStringGeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NolLineStringGeometryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolLineStringGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
