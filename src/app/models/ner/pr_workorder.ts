export class PrWorkorder {
  prNo: string = '';
  prType: string = '';
  prStatus: string = '';
  deptCode: string = '';
  deptSymbol: string = '';
  division: string = '';
  fullName: string = '';
  dateCreated: string = '';
  timeCreated: string = '';
  remark: string = '';
  approveDate: string = '';
  approveTime: string = '';
  approveName: string = '';
  budgetsStatus: string = '';

  item: number = 0;
  pdCode: string = '';
  pdDetail: string = '';
  qty: number = 0;
  keeping: string = '';
  bdgCode: string = '';
  objective: string = '';
  po: string = '';
  poDate: string = '';
  approveStatus: boolean = false;
  itemsStatus: boolean = false;
}

// export interface PrWorkorderResponse {
//   Item: number;
//   prNo: string;
//   pdCode: string;
//   pdDetail: string;
//   qty: number;
//   keeping: string;
//   bdgCode: string;
//   objective: string;
//   po: string;
//   approveStatus: boolean;
//   itemsStatus: boolean;
// }
