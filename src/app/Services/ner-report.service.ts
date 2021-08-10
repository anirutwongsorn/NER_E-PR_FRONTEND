import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NerDepartment } from '../models/ner/ner_department';
import { PrSummaryReport } from '../models/ner/pr_summaryReport';

@Injectable({
  providedIn: 'root',
})
export class NerReportService {
  constructor(private httpClient: HttpClient) {}

  getPrOverAllSummary(prYear: string): Observable<PrSummaryReport[]> {
    return this.httpClient
      .get('NerPurReport/GetPrOverallSummary?prYY=' + prYear)
      .pipe(map((result: any) => result.model));
  }

  getPrOverAllSummaryByDept(
    prYear: string,
    deptCode: string
  ): Observable<PrSummaryReport[]> {
    return this.httpClient
      .get(
        'NerPurReport/GetPrOverallSummaryByDept?prYY=' +
          prYear +
          '&deptCd=' +
          deptCode
      )
      .pipe(map((result: any) => result.model));
  }

  getPrPendingMain(prYear: string): Observable<PrSummaryReport[]> {
    return this.httpClient
      .get('NerPurReport/GetPrPendingMain?prYY=' + prYear)
      .pipe(map((result: any) => result.model));
  }

  getPrPendingMainByMonth(prYear: string): Observable<PrSummaryReport[]> {
    return this.httpClient
      .get('NerPurReport/GetPrPendingMainByMonth?prYY=' + prYear)
      .pipe(map((result: any) => result.model));
  }

  getPrPendingPrItem(prYear: string): Observable<PrSummaryReport> {
    return this.httpClient
      .get<PrSummaryReport>('NerPurReport/GetPrPendingPrItem?prYY=' + prYear)
      .pipe(map((result: any) => result.model));
  }

  getPrPendingPrItemByMonth(prYear: string): Observable<PrSummaryReport[]> {
    return this.httpClient
      .get('NerPurReport/GetPrPendingPrItemByMonth?prYY=' + prYear)
      .pipe(map((result: any) => result.model));
  }

  getPrPendingPrItemByMonthDept(prYear: string): Observable<PrSummaryReport[]> {
    return this.httpClient
      .get('NerPurReport/GetPrPendingMainByMonthDept?prYY=' + prYear)
      .pipe(map((result: any) => result.model));
  }

  getNerDepartment(deptCode: string): Observable<NerDepartment[]> {
    return this.httpClient
      .get<NerDepartment[]>('NerPurReport/GetDepartment?deptCode=' + deptCode)
      .pipe(map((result: any) => result.model));
  }
}
