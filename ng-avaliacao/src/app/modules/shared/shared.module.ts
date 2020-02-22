import { ConfirmModalComponent } from './modal/confirm-modal/confirm-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [
    CommonModule,
    NgbModule
  ], providers: [
    ConfirmModalComponent
  ],
  exports: [
    ConfirmModalComponent
  ]
})
export class SharedModule { }
