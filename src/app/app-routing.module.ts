import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrHeader } from './models/ner/pr_header';
import { PrPendingDeptComponent } from './ner/pr-pending-dept/pr-pending-dept.component';
import { PrPendingItemComponent } from './ner/pr-pending-item/pr-pending-item.component';
import { PrStatusDateToDateComponent } from './ner/pr-status-date-to-date/pr-status-date-to-date.component';
import { PurPrActionsComponent } from './ner/pur-pr-actions/pur-pr-actions.component';
import { PurPrDashboardDeptComponent } from './ner/pur-pr-dashboard-dept/pur-pr-dashboard-dept.component';
import { PurPrDashboardComponent } from './ner/pur-pr-dashboard/pur-pr-dashboard.component';
import { PurPrOverviewComponent } from './ner/pur-pr-overview/pur-pr-overview.component';
import { TimeSettingComponent } from './ner/setting/time-setting/time-setting.component';
//import { StockEditComponent } from './stock/stock-edit/stock-edit.component';

const routes: Routes = [
  {
    path: 'nerubber',
    children: [
      { path: '', component: PurPrOverviewComponent },
      {
        path: 'actions/:prno',
        component: PurPrActionsComponent,
        data: PrHeader,
      },
      {
        path: 'prpendingbydepartment/:deptCode',
        component: PrPendingDeptComponent,
        data: PrHeader,
      },
      { path: 'prpending', component: PurPrDashboardComponent },
      { path: 'prpendingByDepartment', component: PurPrDashboardDeptComponent },
      { path: 'prpendingItem', component: PrPendingItemComponent },
      { path: 'overview', component: PurPrOverviewComponent },
      { path: 'prhistory', component: PrStatusDateToDateComponent },
      { path: 'timesetting', component: TimeSettingComponent },
    ],
  },

  { path: '**', redirectTo: 'nerubber' },
  { path: '', redirectTo: 'nerubber', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
