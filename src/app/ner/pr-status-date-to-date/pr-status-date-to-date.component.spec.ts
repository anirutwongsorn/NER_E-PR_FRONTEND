import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrStatusDateToDateComponent } from './pr-status-date-to-date.component';

describe('PrStatusDateToDateComponent', () => {
  let component: PrStatusDateToDateComponent;
  let fixture: ComponentFixture<PrStatusDateToDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrStatusDateToDateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrStatusDateToDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
