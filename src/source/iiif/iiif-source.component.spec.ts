import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolIIIFSourceComponent } from './iiif-source.component';

describe('NolIIIFSourceComponent', () => {
  let component: NolIIIFSourceComponent;
  let fixture: ComponentFixture<NolIIIFSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolIIIFSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolIIIFSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
