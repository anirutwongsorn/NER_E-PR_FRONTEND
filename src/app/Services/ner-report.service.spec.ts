import { TestBed } from '@angular/core/testing';

import { NerReportService } from './ner-report.service';

describe('NerReportService', () => {
  let service: NerReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NerReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
