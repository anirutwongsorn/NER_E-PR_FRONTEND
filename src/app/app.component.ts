import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { TokenStorageService } from './Services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy, OnInit {
  mobileQueryMax: MediaQueryList;

  isLoggedIn = false;
  fullName: string = '';
  private _mobileQueryListener: () => void;

  constructor(
    private tokenStorageService: TokenStorageService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQueryMax = media.matchMedia('(max-width: 600px)');
    this.mobileQueryMax.addEventListener('change', this._mobileQueryListener);
    //this.mobileQueryMax.addEventListener('change', this._mobileQueryListener);
  }
  
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.fullName = this.tokenStorageService.getUser();
    }
  }

  ngOnDestroy(): void {
    this.mobileQueryMax.removeEventListener(
      'change',
      this._mobileQueryListener
    );
  }
}
