import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolImageSourceComponent } from './image-source.component';

describe('NolImageSourceComponent', () => {
  let component: NolImageSourceComponent;
  let fixture: ComponentFixture<NolImageSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolImageSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolImageSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
