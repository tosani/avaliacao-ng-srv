import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener, NgZone } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
  @ViewChild('maincontent') eMainFrame: ElementRef;

  fixedFooter: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.ajustarFixedFooter();
  }

  ajustarFixedFooter(): void {
    this.fixedFooter = this.eMainFrame.nativeElement.offsetHeight < 400 && this.eMainFrame.nativeElement.offsetWidth > 1000;
    this.changeDetectorRef.detectChanges();
  }

  resizeTimeout: any;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout((() => {
      this.ajustarFixedFooter()
    }).bind(this), 500);
  }
}
