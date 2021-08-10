import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TimeSetting } from 'src/app/models/ner/time_setting';
import { NerService } from 'src/app/Services/ner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-time-setting',
  templateUrl: './time-setting.component.html',
  styleUrls: ['./time-setting.component.css'],
})
export class TimeSettingComponent implements OnInit {
  constructor(private nerService: NerService) {}

  timePeriodSetting: TimeSetting = new TimeSetting();

  ngOnInit(): void {
    this.getSetting();
  }

  getSetting() {
    // alert('getTimePeriodSetting');
    this.nerService.getTimePeriodSetting().subscribe((data: TimeSetting) => {
      this.timePeriodSetting = data;
    });
  }

  onSubmit(productForm: NgForm) {
    if (productForm.invalid) {
      return;
    }
    const val = productForm.value;
    var dFrom = val.dFrom;
    var dTo = val.dTo;

    Swal.fire({
      title: dFrom + ' - ' + dTo,
      text: 'ยืนยันการตั้งค่าช่วงเวลา ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยันการตั้งค่า',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.nerService.settingTimePeriod(dFrom, dTo).subscribe((_) => {});
      }
    });
  }
}
