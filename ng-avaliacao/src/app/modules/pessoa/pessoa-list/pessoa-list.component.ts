import { PessoaExcluir } from './../store/actions/pessoa-actions';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ListarPessoaResult, Pessoa } from 'src/app/model/pessoa';
import { BaseComponent } from '../../shared/base-component';
import { PessoaModalComponent } from '../pessoa-modal/pessoa-modal.component';
import { PessoaAlterar, PessoaIncluir } from '../store/actions/pessoa-actions';
import { ConfirmModalComponent } from './../../shared/modal/confirm-modal/confirm-modal.component';
import { getPesquisaResult, getAlteracaoResult } from './../store/selectors/pessoa-selectors';
import { WsResult } from 'src/app/model/ws-result';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss']
})
export class PessoaListComponent extends BaseComponent implements OnInit {

  pessoasResult: ListarPessoaResult;
  pessoas: Pessoa[];

  constructor(private store: Store<any>, private toastrService: ToastrService,
    private modalService: NgbModal) {
    super(null);
  }

  ngOnInit() {
    this.addSubsc(this.store.select(getPesquisaResult).subscribe(r => {
      this.pessoasResult = r;
      if (r && r.success) {
        this.pessoas = r.payload;
      }
    }));
  }

  alterar(pessoa: Pessoa) {
    this.showModalPessoa(pessoa);
  }

  excluirConfirm(pessoa: Pessoa) {
    this.showConfirmExclusao(pessoa);
  }

  excluir(pessoa: Pessoa) {
    this.store.dispatch(new PessoaExcluir({ id: pessoa.id }));
  }

  incluir() {
    this.showModalPessoa(new Pessoa());
  }

  showModalPessoa(pessoa: Pessoa) {
    const modal = this.modalService.open(PessoaModalComponent, { centered: true, keyboard: false, backdrop : 'static' });
    modal.componentInstance.pessoa = pessoa;
    modal.result.then(() => {
    }, () => {
    });
  }

  showConfirmExclusao(pessoa: Pessoa) {
    const modal = this.modalService.open(ConfirmModalComponent, { centered: true });
    modal.componentInstance.mensagem = 'Deseja realmente excluir ' + pessoa.nome + '?';
    modal.result.then((result) => {
      if (result) {
        this.excluir(pessoa);
      }
    }, () => {
    });
  }

}
