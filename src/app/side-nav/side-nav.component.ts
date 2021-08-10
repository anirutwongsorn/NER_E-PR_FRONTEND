import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  @Output('dismiss') navDismiss = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onclickNavClose() {
    this.navDismiss.emit();
  }
}
