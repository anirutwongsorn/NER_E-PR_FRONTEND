import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { TokenStorageService } from '../Services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input('media_query') mobileQueryMax: boolean = false;
  @Output('toogle') navToggle = new EventEmitter();
  //@Output('signgout') signgout = new EventEmitter();
  //@Output() sayHi = new EventEmitter<String>();

  demoMailNoti = 50;
  demoNoti = 5;

  fullName: string = 'E-PR version 1.0';

  constructor(private authService: TokenStorageService) {}

  ngOnInit(): void {
    this.fullName = this.authService.getUser();
  }

  onClickNavToggle() {
    this.navToggle.emit();
    //this.sayHi.emit('Anirut');
  }

  logout(): void {
    Swal.fire({
      title: 'ออกจากระบบ',
      text: 'ยืนยัน?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ออกจากระบบ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.signOut();
        window.location.reload();
      }
    });
  }
}
