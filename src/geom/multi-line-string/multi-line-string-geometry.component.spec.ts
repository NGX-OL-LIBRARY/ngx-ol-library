import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolMultiLineStringGeometryComponent } from './multi-line-string-geometry.component';

describe('NolMultiLineStringGeometryComponent', () => {
  let component: NolMultiLineStringGeometryComponent;
  let fixture: ComponentFixture<NolMultiLineStringGeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NolMultiLineStringGeometryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolMultiLineStringGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
