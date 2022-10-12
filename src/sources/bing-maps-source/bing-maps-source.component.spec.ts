import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolBingMapsSourceComponent } from './bing-maps-source.component';

describe('NolBingMapsSourceComponent', () => {
  let component: NolBingMapsSourceComponent;
  let fixture: ComponentFixture<NolBingMapsSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolBingMapsSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolBingMapsSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
