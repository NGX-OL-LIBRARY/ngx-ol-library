import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolImageStyleComponent } from './image-style.component';

describe('NolImageStyleComponent', () => {
  let component: NolImageStyleComponent;
  let fixture: ComponentFixture<NolImageStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NolImageStyleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolImageStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
