import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolOSMSourceComponent } from './osm-source.component';

describe('NolOSMSourceComponent', () => {
  let component: NolOSMSourceComponent;
  let fixture: ComponentFixture<NolOSMSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NolOSMSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolOSMSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
