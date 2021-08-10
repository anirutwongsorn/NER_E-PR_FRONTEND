import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// import { ChartDataSets, ChartType } from 'chart.js';
// import { Color, Label, MultiDataSet } from 'ng2-charts';
import { PrSummaryReport } from 'src/app/models/ner/pr_summaryReport';
import { NerReportService } from 'src/app/Services/ner-report.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexPlotOptions,
  ApexMarkers,
  ApexLegend,
} from 'ng-apexcharts';
import * as XLSX from 'xlsx';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  grid: ApexGrid;
  legend: ApexLegend;
};

@Component({
  selector: 'app-pur-pr-overview',
  templateUrl: './pur-pr-overview.component.html',
  styleUrls: ['./pur-pr-overview.component.css'],
})
export class PurPrOverviewComponent implements OnInit {
  @ViewChild('chart')
  chart!: ChartComponent;
  barChartOptions: Partial<any> = [];
  donutChartOptions: Partial<any> = [];
  lineChartOptions: Partial<any> = [];
  groupChartOptions: Partial<any> = [];
  constructor(private nerRptService: NerReportService) {}

  summaryReport?: PrSummaryReport[];

  displayedColumn: string[] = [
    'prYear',
    'prAll',
    'prApproved',
    'prCompleted',
    'prChecked',
  ];

  displayedDeptColumn: string[] = [
    'prYear',
    'deptCode',
    'deptSymbol',
    'division',
    'prAll',
    'prApproved',
    'prCompleted',
    'prChecked',
  ];

  fileName = 'Overall_PR.xlsx';

  textSearch: string = '';

  dataSource = new MatTableDataSource<PrSummaryReport>();
  dataSourceDept = new MatTableDataSource<PrSummaryReport>();

  @ViewChild(MatPaginator, { static: true }) paginatorDept?: MatPaginator;

  ngOnInit(): void {
    this.getPrpendingByDepartment();
    this.getPrpendingByMonth();
    this.getPrByMonthDept();
  }

  actualKpi: number | 1.1 = 0;
  missedKpi: number | 1.1 = 0;

  getPrpendingByDepartment() {
    this.nerRptService.getPrPendingMain('').subscribe((data) => {
      data.map((item) => {
        this.actualKpi = item.avgKpi;
        return item.prChecked;
      });

      this.missedKpi = 100 - this.actualKpi;
      var chartVal = [this.actualKpi, this.missedKpi];
      var chartLabel = ['Completed', 'Pending'];

      this.plotBarChart(data);
      this.plotDonutChart(chartVal, chartLabel);
    });
  }

  getPrpendingByMonth() {
    this.nerRptService.getPrPendingMainByMonth('').subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

      var lineChartVal = data.map((item) => {
        return item.prChecked;
      });

      var barValCompleted = data.map((item) => {
        return item.prApproved + item.prCompleted;
      });

      var barValAll = data.map((item) => {
        return item.prChecked + item.prApproved + item.prCompleted;
      });

      var lineChartLabel = data.map((item) => {
        return item.prYear;
      });
      this.plotLineChart(lineChartVal, lineChartLabel);
      this.plotGroupPr(
        barValAll,
        barValCompleted,
        lineChartVal,
        lineChartLabel
      );
    });
  }

  getPrByMonthDept() {
    this.nerRptService.getPrPendingPrItemByMonthDept('').subscribe((data) => {
      this.dataSourceDept = new MatTableDataSource(data);
      this.dataSourceDept.paginator = this.paginatorDept!;
    });
  }

  plotBarChart(data: PrSummaryReport[]) {
    var _chartLbl = data.map((item) => {
      return item.deptSymbol;
    });

    var _chartVal = data.map((item) => {
      return item.prChecked;
    });

    this.barChartOptions = {
      series: [
        {
          name: 'Pending',
          data: _chartVal,
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: 'PR pending by department',
      },
      grid: {
        row: {
          colors: ['#fff', '#f2f2f2'],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: _chartLbl,
        tickPlacement: 'on',
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          endingShape: 'rounded',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    };
  }

  plotDonutChart(chartVal: number[], chartLabel: string[]) {
    this.donutChartOptions = {
      series: chartVal,
      chart: {
        type: 'donut',
        height: 400,
      },
      title: {
        text: 'Purchasing efficiency',
      },
      fill: {
        colors: ['#078a00', '#F44336', '#E91E63', '#9C27B0'],
      },
      colors: ['#078a00', '#F44336', '#E91E63', '#9C27B0'],
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
      },
      labels: chartLabel,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100,
            },
            legend: {
              position: 'top',
            },
          },
        },
      ],
    };
  }

  plotLineChart(chartVal: number[], chartLabel: string[]) {
    this.lineChartOptions = {
      series: [
        {
          name: 'PR pending',
          data: chartVal,
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'NER PR pending',
        align: 'left',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: chartLabel,
        title: {
          text: 'Month',
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    };
  }

  plotGroupPr(
    chartValAll: number[],
    chartValCompleted: number[],
    chartValPending: number[],
    chartLabel: string[]
  ) {
    this.groupChartOptions = {
      series: [
        {
          name: 'All PR',
          data: chartValAll,
        },
        {
          name: 'Completed',
          data: chartValCompleted,
        },
        {
          name: 'Pending',
          data: chartValPending,
        },
      ],
      chart: {
        type: 'bar',
        height: 500,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      title: {
        text: 'NER PR REPORT BY STATUS',
      },
      xaxis: {
        categories: chartLabel,
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      fill: {
        opacity: 1,
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        offsetX: 40,
      },
    };
  }

  search(event: any = null) {
    let filterVal = '';
    if (event) {
      filterVal = (event.target as HTMLInputElement).value;
    }
    this.dataSourceDept.filter = filterVal.trim().toLowerCase();
  }

  clearSearch() {
    this.textSearch = '';
    this.search();
    console.log(this.search);
  }

  exportexcel() {
    /* table id is passed over here */
    let element = document.getElementById('allprPending');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'NER_All_PrPending');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  exportexcelDept() {
    /* table id is passed over here */
    let element = document.getElementById('prPendingDept');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'NER_PR_All');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
