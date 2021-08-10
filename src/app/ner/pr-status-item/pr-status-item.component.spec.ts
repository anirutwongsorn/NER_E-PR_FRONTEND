import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrStatusItemComponent } from './pr-status-item.component';

describe('PrStatusItemComponent', () => {
  let component: PrStatusItemComponent;
  let fixture: ComponentFixture<PrStatusItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrStatusItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrStatusItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
