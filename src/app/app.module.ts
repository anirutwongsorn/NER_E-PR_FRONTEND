import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { OverlayModule } from '@angular/cdk/overlay';

import { SideNavComponent } from './side-nav/side-nav.component';
import { StockHomeComponent } from './stock/stock-home/stock-home.component';
import { StockCreateComponent } from './stock/stock-create/stock-create.component';
import { StockEditComponent } from './stock/stock-edit/stock-edit.component';
import { httpInterceptorProvider } from './interceptors';
import { PurPrDashboardComponent } from './ner/pur-pr-dashboard/pur-pr-dashboard.component';
import { PurPrActionsComponent } from './ner/pur-pr-actions/pur-pr-actions.component';
import { PoDialogComponent } from './ner/po-dialog/po-dialog.component';
import { PurPrOverviewComponent } from './ner/pur-pr-overview/pur-pr-overview.component';

import { ChartsModule } from 'ng2-charts';
import { PrStatusComponent } from './ner/pr-status/pr-status.component';
import { PrPendingDeptComponent } from './ner/pr-pending-dept/pr-pending-dept.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PurPrDashboardDeptComponent } from './ner/pur-pr-dashboard-dept/pur-pr-dashboard-dept.component';
import { TimeSettingComponent } from './ner/setting/time-setting/time-setting.component';
import { PrPendingItemComponent } from './ner/pr-pending-item/pr-pending-item.component';
import { PrStatusItemComponent } from './ner/pr-status-item/pr-status-item.component';
import { LoginComponent } from './login/login.component';
import { PrStatusDateToDateComponent } from './ner/pr-status-date-to-date/pr-status-date-to-date.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    StockHomeComponent,
    StockCreateComponent,
    StockEditComponent,
    ProgressbarComponent,
    PurPrDashboardComponent,
    PurPrActionsComponent,
    PoDialogComponent,
    PurPrOverviewComponent,
    PrStatusComponent,
    PrPendingDeptComponent,
    PurPrDashboardDeptComponent,
    TimeSettingComponent,
    PrPendingItemComponent,
    PrStatusItemComponent,
    LoginComponent,
    PrStatusDateToDateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayModule,
    FormsModule,
    HttpClientModule,

    ChartsModule,
    MaterialModule,
    NgApexchartsModule,
  ],
  providers: [httpInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
