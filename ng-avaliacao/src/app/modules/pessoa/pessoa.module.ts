import { TextMaskModule } from 'angular2-text-mask';
import { ConfirmModalComponent } from './../shared/modal/confirm-modal/confirm-modal.component';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PessoaPageComponent } from './pessoa-page/pessoa-page.component';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { effects } from './store/effects';
import { reducerMap } from './store/reducers';
import { PessoaListComponent } from './pessoa-list/pessoa-list.component';
import { PessoaModalComponent } from './pessoa-modal/pessoa-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PessoaPageComponent, PessoaListComponent, PessoaModalComponent],
  imports: [
    CommonModule,
    NgbModule,
    PessoaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('pessoaMod', reducerMap),
    EffectsModule.forFeature(effects),
    SharedModule,
    TextMaskModule
  ],
  entryComponents: [
    PessoaModalComponent,
    ConfirmModalComponent
  ]
})
export class PessoaModule { }
