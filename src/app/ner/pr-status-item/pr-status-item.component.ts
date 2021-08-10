import { Component, OnInit } from '@angular/core';
import { PrSummaryReport } from 'src/app/models/ner/pr_summaryReport';
import { NerReportService } from 'src/app/Services/ner-report.service';

@Component({
  selector: 'app-pr-status-item',
  templateUrl: './pr-status-item.component.html',
  styleUrls: ['./pr-status-item.component.css'],
})
export class PrStatusItemComponent implements OnInit {
  constructor(private nerService: NerReportService) {}

  prSummaryReport: PrSummaryReport = new PrSummaryReport();

  ngOnInit(): void {
    this.getOverAllStatus();
  }

  getOverAllStatus() {
    this.nerService
      .getPrPendingPrItem('')
      .subscribe((data: PrSummaryReport) => {
        this.prSummaryReport = data;
      });

    //alert(JSON.stringify(this.prSummaryReport));
  }
}
