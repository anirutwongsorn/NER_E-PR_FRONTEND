import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrCancelBody } from '../models/ner/pr_cancel';
import { PrHeader } from '../models/ner/pr_header';
import { PrWorkorder } from '../models/ner/pr_workorder';
import { TimeSetting } from '../models/ner/time_setting';
//import { PrWorkorderResponse } from '../models/ner/pr_workorder';

@Injectable({
  providedIn: 'root',
})
export class NerService {
  constructor(private httpClient: HttpClient) {}

  //finalPath: string = environment.baseUrl;

  getPurchasingByStatus(prstatus: string): Observable<PrHeader[]> {
    return this.httpClient
      .get<PrHeader[]>(
        `NerPurchasing/GetPurchasingMainByStatus?&status=${prstatus}`
      )
      .pipe(map((result: any) => result.prmodel));
  }

  getPurchaseRequestItemByStatus(prStatus: string): Observable<PrWorkorder[]> {
    return this.httpClient
      .get<PrWorkorder[]>(
        `NerPurchasing/GetPurchasingDescByStatus?status=${prStatus}`
      )
      .pipe(map((result: any) => result.prmodel));
  }

  getPurchaseRequestItemByDate(
    dfrom: string,
    dto: string
  ): Observable<PrWorkorder[]> {
    return this.httpClient
      .get<PrWorkorder[]>(
        `NerPurchasing/GetPurchasingDescByDate?dFrom=${dfrom}&dTo=${dto}`
      )
      .pipe(map((result: any) => result.prmodel));
  }

  getPurchaseRequestByDocNo(prno: string): Observable<PrWorkorder[]> {
    return this.httpClient
      .get<PrWorkorder[]>(`NerPurchasing/GetPurchasingDescByDocNo?prNo=${prno}`)
      .pipe(map((result: any) => result.prmodel));
  }

  getPurchaseRequestByDeptCode(
    prNo: string,
    deptCode: string
  ): Observable<PrHeader[]> {
    return this.httpClient
      .get<PrHeader[]>(
        `NerPurchasing/GetPurchasingByDeptCode?prYear=${prNo}&deptCode=${deptCode}`
      )
      .pipe(map((result: any) => result.prmodel));
  }

  getTimePeriodSetting(): Observable<TimeSetting> {
    return this.httpClient
      .get<TimeSetting>('NerPurchasing/GetPeriodTimeSetting')
      .pipe(map((result: any) => result.model));
  }

  acknowledgePR(prno: string): Observable<number> {
    return this.httpClient
      .put<number>(`NerPurchasing/AcknowledgePr?prNo=${prno}`, null)
      .pipe(map((result: any) => result.result));
  }

  CancelPurchaseRequest(prCancel: PrCancelBody): Observable<any> {
    var body = JSON.parse(JSON.stringify(prCancel));
    console.log(body);

    return this.httpClient.put<any>(
      'NerPurchasing/CancelPurchaseRequest',
      body
    );
  }

  updatePrItemStatus(
    item: number,
    poNo: string = '',
    poDate: string = '',
    isAppr: boolean = false
  ): Observable<number> {
    return this.httpClient.put<number>(
      `NerPurchasing/UpdatePrItemStatus?item=${item}&poNo=${poNo}&poDate=${poDate}&isAppr=${isAppr}`,
      null
    );
  }

  settingTimePeriod(dFrom: string, dTo: string): Observable<number> {
    return this.httpClient.put<number>(
      `NerPurchasing/UpdateTimeLimit?dFrom=${dFrom}&dTo=${dTo}`,
      null
    );
  }
}
