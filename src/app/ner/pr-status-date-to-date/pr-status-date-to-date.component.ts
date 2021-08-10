import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PrWorkorder } from 'src/app/models/ner/pr_workorder';
import { NerService } from 'src/app/Services/ner.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pr-status-date-to-date',
  templateUrl: './pr-status-date-to-date.component.html',
  styleUrls: ['./pr-status-date-to-date.component.css'],
})
export class PrStatusDateToDateComponent implements OnInit {
  displayedColumn: string[] = [
    'prNo',
    'prStatus',
    'prType',
    'fullName',
    'dateCreated',
    'timeCreated',
    'deptSymbol',
    'division',
    'remark',
    'approveName',
    'approveDate',
    'approveTime',
    'pdCode',
    'pdDetail',
    'qty',
    'keeping',
    'bdgCode',
    'objective',
    'po',
    'poDate'
  ];

  textSearch: string = '';

  fileName = 'all_prItem.xlsx';

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  dataSource = new MatTableDataSource<PrWorkorder>();

  constructor(private nerService: NerService) {}

  ngOnInit(): void {}

  onSubmit(prForm: NgForm) {
    if (prForm.invalid) {
      return;
    }
    const val = prForm.value;
    var dFrom = val.dFrom;
    var dTo = val.dTo;
    //alert(dFrom + ', ' + dTo);

    this.nerService
      .getPurchaseRequestItemByDate(dFrom, dTo)
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator!;
      });
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
    let element = document.getElementById('allprPendingitem');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'NER_All_PrPendingItem');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
