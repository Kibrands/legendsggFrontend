import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VictoryRatioDoughnutComponent } from './victory-ratio-doughnut.component';

describe('VictoryRatioDoughnutComponent', () => {
  let component: VictoryRatioDoughnutComponent;
  let fixture: ComponentFixture<VictoryRatioDoughnutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VictoryRatioDoughnutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VictoryRatioDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
