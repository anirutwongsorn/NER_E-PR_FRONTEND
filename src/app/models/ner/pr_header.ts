export class PrHeader {
  prNo: string = '';
  userId: string = '';
  fullName: string = '';
  deptCode: string = '';
  dateCreated: string = '';
  timeCreated: string = '';
  prType: string = '';
  dateNeed: string = '';
  remark: string = '';
  approveDate: string = '';
  approveName: string = '';
  approveTime: string = '';
  budgetsStatus: string = '';
  status: string = '';
  itemCount: number = 0;
  acknDate: string = '';
  acknName: string = '-';
  isAckn: boolean = false;
  iconName: string = 'horizontal_rule';
}

// export interface PrHeaderResponse {
//   prNo: string;
//   userId: string;
//   fullName: string;
//   deptCode: string;
//   dateCreated: string;
//   timeCreated: string;
//   prType: string;
//   dateNeed: string;
//   remark: string;
//   approveDate: string;
//   approveName: string;
//   approveTime: string;
//   budgetsStatus: string;
//   status: string;
//   itemCount: number;
// }
