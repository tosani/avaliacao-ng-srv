import { getAlteracaoResult, getExclusaoResult, getInclusaoResult } from './../store/selectors/pessoa-selectors';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PessoaPesquisar } from '../store/actions/pessoa-actions';
import { BaseComponent } from '../../shared/base-component';
import { WsResult } from 'src/app/model/ws-result';

@Component({
  selector: 'app-pessoa-page',
  templateUrl: './pessoa-page.component.html',
  styleUrls: ['./pessoa-page.component.scss']
})
export class PessoaPageComponent extends BaseComponent implements OnInit {

  nome: string;
  cpf: string;

  constructor(private store: Store<any>, private toastrService: ToastrService) {
    super(null);
  }

  ngOnInit() {
    this.addSubsc(this.store.select(getAlteracaoResult).subscribe(r => {
      this.tratarResultOperacao(r);
    }));

    this.addSubsc(this.store.select(getExclusaoResult).subscribe(result => {
      if (result && result.success) {
        setTimeout(() => this.toastrService.success(result.message));
        this.pesquisar();
      }
    }));

    this.addSubsc(this.store.select(getInclusaoResult).subscribe(r => {
      this.tratarResultOperacao(r);
    }));

  }

  tratarResultOperacao(result: WsResult) {
    if (result && result.success) {
      this.pesquisar();
    }
  }

  pesquisar() {
    const payload = {
      cpf: this.cpf ? this.cpf : null,
      nome: this.nome ? this.nome : null
    };
    this.store.dispatch(new PessoaPesquisar(payload));
  }
}
