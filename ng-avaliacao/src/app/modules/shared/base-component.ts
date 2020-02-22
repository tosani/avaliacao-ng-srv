import { Location } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MascarasFunctions } from './mascaras.functions';
import { NgModel } from '@angular/forms';

export class BaseComponent implements OnDestroy {

  maskTelefone: Function = MascarasFunctions.telefone;
  maskNumerico: Function = MascarasFunctions.numerico;
  maskData: Function = MascarasFunctions.data;
  maskCpf: Function = MascarasFunctions.cpf;
  maskSemEspaco: Function = MascarasFunctions.semEspaco;

  subscriptions: Subscription[] = [];

  location: Location;

  constructor(location: Location) {
    this.location = location;
  }

  ngOnDestroy(): void {
    if (!this.subscriptions) {
      return;
    }
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  addSubsc(sub: Subscription): void {
    this.subscriptions.push(sub);
  }

  voltar(): void {
    this.location.back();
  }

  isInvalid(campo: NgModel) {
    return campo.invalid && (campo.dirty || campo.touched);
  }

  getValorSemMask(valor: string) {
    if (!valor) {
      return '';
    }
    return valor.replace(/[^a-zA-Z0-9]/g, '');
  }
}
