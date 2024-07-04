import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NolIconStyleComponent } from './icon-style.component';

describe('NolIconStyleComponent', () => {
  let component: NolIconStyleComponent;
  let fixture: ComponentFixture<NolIconStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NolIconStyleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NolIconStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
