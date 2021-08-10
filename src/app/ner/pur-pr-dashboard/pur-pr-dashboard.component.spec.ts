import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurPrDashboardComponent } from './pur-pr-dashboard.component';

describe('PurPrDashboardComponent', () => {
  let component: PurPrDashboardComponent;
  let fixture: ComponentFixture<PurPrDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurPrDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurPrDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
