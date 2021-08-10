import { Component, OnInit } from '@angular/core';
import { NerReportService } from 'src/app/Services/ner-report.service';

@Component({
  selector: 'app-pr-status',
  templateUrl: './pr-status.component.html',
  styleUrls: ['./pr-status.component.css'],
})
export class PrStatusComponent implements OnInit {
  constructor(private nerService: NerReportService) {}

  sumPending: number = 0;
  sumChecked: number = 0;
  sumApproved: number = 0;
  sumCompleted: number = 0;

  ngOnInit(): void {
    this.getOverAllStatus();
  }

  getOverAllStatus() {
    this.nerService.getPrOverAllSummary('').subscribe((data) => {
      data.map((item) => {
        switch (item.prStatus) {
          case 'pending': {
            this.sumPending = item.prPending;
            break;
          }
          case 'checked': {
            this.sumChecked = item.prPending;
            break;
          }
          case 'approved': {
            this.sumApproved = item.prPending;
            break;
          }
          case 'completed': {
            this.sumCompleted = item.prPending;
            break;
          }
        }
      });
    });
  }
}
