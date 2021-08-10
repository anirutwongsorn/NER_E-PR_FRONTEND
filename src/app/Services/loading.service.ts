import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private overlayRef: OverlayRef = this.createOverlay();
  private templatePortal!: TemplatePortal<any>;

  inderminate: Subject<boolean> = new Subject();
  derminate: Subject<number> = new Subject();

  constructor(private overlay: Overlay) {
    this.inderminate.subscribe((show) => {
      console.log(show);

      if (show && !this.overlayRef.hasAttached()) {
        this.showSpinner();
      } else if (!show && this.overlayRef.hasAttached()) {
        this.hiddenSpinner();
      }
    });

    this.derminate.subscribe((number) => {
      if (number < 100 && !this.overlayRef.hasAttached()) {
        this.hiddenSpinner();
      } else if (number >= 100 && this.overlayRef.hasAttached()) {
        this.hiddenSpinner();
      }
    });
  }

  private createOverlay(): OverlayRef {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'custom-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
  }

  private showSpinner() {
    this.overlayRef.attach(this.templatePortal);
  }

  private hiddenSpinner() {
    this.overlayRef.detach();
  }

  attatch(
    templatePortalContent: TemplateRef<any>,
    viewContainerRef: ViewContainerRef
  ) {
    this.templatePortal = new TemplatePortal(
      templatePortalContent,
      viewContainerRef
    );
  }
}
