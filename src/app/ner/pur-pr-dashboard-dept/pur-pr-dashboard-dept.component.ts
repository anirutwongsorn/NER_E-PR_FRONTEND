import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PrSummaryReport } from 'src/app/models/ner/pr_summaryReport';
import { NerReportService } from 'src/app/Services/ner-report.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pur-pr-dashboard-dept',
  templateUrl: './pur-pr-dashboard-dept.component.html',
  styleUrls: ['./pur-pr-dashboard-dept.component.css'],
})
export class PurPrDashboardDeptComponent implements OnInit {
  textSearch: string = '';

  dataSource = new MatTableDataSource<PrSummaryReport>();

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  displayedColumn: string[] = [
    'deptCode',
    'deptSymbol',
    'division',
    'prAll',
    'prApproved',
    'prCompleted',
    'prChecked',
    'prKpi',
  ];

  /*name of the excel-file which will be downloaded. */
  fileName = 'prPending.xlsx';

  constructor(private nerRptService: NerReportService) {}

  ngOnInit(): void {
    this.getPrpendingByDepartment();
  }

  getPrpendingByDepartment() {
    this.nerRptService.getPrPendingMain('').subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator!;
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  search(event: any = null) {
    let filterVal = '';
    if (event) {
      filterVal = (event.target as HTMLInputElement).value;
    }
    this.dataSource.filter = filterVal.trim().toLowerCase();
  }

  clearSearch() {
    this.textSearch = '';
    this.search();
    console.log(this.search);
  }

  exportexcel() {
    /* table id is passed over here */
    let element = document.getElementById('prPending');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'NER_PrPending');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
