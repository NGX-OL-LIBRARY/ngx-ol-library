import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolOverviewMapControlComponent } from './overview-map-control.component';

describe('NolOverviewMapControlComponent', () => {
  let component: NolOverviewMapControlComponent;
  let fixture: ComponentFixture<NolOverviewMapControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolOverviewMapControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolOverviewMapControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
