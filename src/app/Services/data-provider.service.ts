import { Injectable } from '@angular/core';
import { PrHeader } from '../models/ner/pr_header';

@Injectable({
  providedIn: 'root',
})
export class DataProviderService {
  public scope?: PrHeader;

  constructor() {}

  public getScope(): PrHeader {
    return this.scope!;
  }

  public setScope(scope: PrHeader): void {
    this.scope = scope;
  }
}
