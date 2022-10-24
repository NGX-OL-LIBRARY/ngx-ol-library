import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolZoomifySourceComponent } from './zoomify-source.component';

describe('NolZoomifySourceComponent', () => {
  let component: NolZoomifySourceComponent;
  let fixture: ComponentFixture<NolZoomifySourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolZoomifySourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolZoomifySourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
