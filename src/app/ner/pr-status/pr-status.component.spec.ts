import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrStatusComponent } from './pr-status.component';

describe('PrStatusComponent', () => {
  let component: PrStatusComponent;
  let fixture: ComponentFixture<PrStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
