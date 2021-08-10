import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurPrDashboardDeptComponent } from './pur-pr-dashboard-dept.component';

describe('PurPrDashboardDeptComponent', () => {
  let component: PurPrDashboardDeptComponent;
  let fixture: ComponentFixture<PurPrDashboardDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurPrDashboardDeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurPrDashboardDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
