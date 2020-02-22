import { ToastrService } from 'ngx-toastr';
import { getAlteracaoResult, getInclusaoResult } from './../store/selectors/pessoa-selectors';
import { BaseComponent } from './../../shared/base-component';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pessoa } from 'src/app/model/pessoa';
import { Store } from '@ngrx/store';
import { PessoaAlterar, PessoaIncluir } from '../store/actions/pessoa-actions';
import { WsResult } from 'src/app/model/ws-result';

@Component({
  selector: 'app-pessoa-modal',
  templateUrl: './pessoa-modal.component.html',
  styleUrls: ['./pessoa-modal.component.scss']
})
export class PessoaModalComponent extends BaseComponent implements OnInit {

  titulo: string;
  pessoa: Pessoa;

  constructor(public activeModal: NgbActiveModal, private store: Store<any>, private toastrService: ToastrService) {
    super(null);
  }

  ngOnInit() {
    this.pessoa = Object.assign(new Pessoa(), this.pessoa);
    if (this.pessoa.id) {
      this.titulo = 'Alterar ' + this.pessoa.nome;
    } else {
      this.titulo = 'Incluir pessoa';
    }

    this.addSubsc(this.store.select(getAlteracaoResult).subscribe(r => {
      this.tratarResultOperacao(r);
    }));

    this.addSubsc(this.store.select(getInclusaoResult).subscribe(r => {
      this.tratarResultOperacao(r);
    }));

  }

  tratarResultOperacao(result: WsResult) {
    if (result && result.success) {
      setTimeout(() => this.toastrService.success(result.message));
      this.activeModal.close();
    }
  }

  salvar() {
    const dataSize = this.getValorSemMask(this.pessoa.dataNascimento).length;

    if (dataSize > 0 && dataSize < 8) {
      this.toastrService.error('Data de nascimento inválida');
      return;
    }
    if (this.pessoa.id) {
      this.store.dispatch(new PessoaAlterar({ pessoa: this.pessoa }));
    } else {
      this.store.dispatch(new PessoaIncluir({ pessoa: this.pessoa }));
    }
  }



}
