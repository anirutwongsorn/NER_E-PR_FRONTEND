import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { LoadingService } from '../Services/loading.service';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css'],
})
export class ProgressbarComponent implements OnInit, AfterViewInit {
  @ViewChild('templatePortalContent') templatePortalContent!: TemplateRef<any>;

  @Input() color: ThemePalette;
  @Input() strokeWidth!: number;
  @Input() diaMeter: number = 100;
  @Input() mode: ProgressSpinnerMode = 'indeterminate';
  @Input() value: number = 0;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private loadingService: LoadingService
  ) {
    loadingService.inderminate.subscribe((_) => {
      this.mode = 'indeterminate';
    });

    loadingService.derminate.subscribe((value) => {
      this.mode = 'determinate';
      this.value = value;
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.loadingService.attatch(
      this.templatePortalContent,
      this.viewContainerRef
    );
  }
}
