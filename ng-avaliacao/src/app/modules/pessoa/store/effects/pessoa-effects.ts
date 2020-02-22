import { PessoaAlterarOk, PessoaAlterarErro, PessoaIncluir, PessoaIncluirErro, PessoaIncluirOk, PessoaExcluir, PessoaExcluirOk, PessoaExcluirErro } from './../actions/pessoa-actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ListarPessoaResult, PessoaResult } from 'src/app/model/pessoa';
import { PessoaService } from 'src/app/service/pessoa-service';
import { PessoaActionTypes, PessoaPesquisar, PessoaPesquisarErro, PessoaPesquisarOk, All, PessoaAlterar } from '../actions/pessoa-actions';
import { WsResult } from 'src/app/model/ws-result';


@Injectable()
export class PessoaEffects {

  constructor(
    private actions: Actions,
    private pessoaService: PessoaService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastrService: ToastrService,
  ) {

  }

  @Effect()
  pesquisarPessoas: Observable<any> = this.actions.pipe(
    ofType(PessoaActionTypes.PESQUISAR),
    map((action: PessoaPesquisar) => action.payload),
    switchMap(payload => {
      this.spinnerService.show();
      return this.pessoaService.pesquisar(payload.cpf, payload.nome).pipe(
        map((result: ListarPessoaResult) => {
          this.spinnerService.hide();
          result = Object.assign(new ListarPessoaResult(), result);
          if (result.success) {
            return new PessoaPesquisarOk({ result: result });
          }
          return new PessoaPesquisarErro({ error: result.message, result: result });
        }),
        catchError((error) => {
          this.spinnerService.hide();
          return of(new PessoaPesquisarErro({ error: error }));
        })
      );
    }),
  );

  @Effect()
  alterarPessoa: Observable<any> = this.actions.pipe(
    ofType(PessoaActionTypes.ALTERAR),
    map((action: PessoaAlterar) => action.payload),
    switchMap(payload => {
      this.spinnerService.show();
      return this.pessoaService.alterar(payload.pessoa).pipe(
        map((result: PessoaResult) => {
          this.spinnerService.hide();
          result = Object.assign(new PessoaResult(), result);
          if (result.success) {
            return new PessoaAlterarOk({ result: result });
          }
          return new PessoaAlterarErro({ error: result.message, result: result });
        }),
        catchError((error) => {
          this.spinnerService.hide();
          return of(new PessoaAlterarErro({ error: error }));
        })
      );
    }),
  );

  @Effect()
  incluirPessoa: Observable<any> = this.actions.pipe(
    ofType(PessoaActionTypes.INCLUIR),
    map((action: PessoaIncluir) => action.payload),
    switchMap(payload => {
      this.spinnerService.show();
      return this.pessoaService.incluir(payload.pessoa).pipe(
        map((result: PessoaResult) => {
          this.spinnerService.hide();
          result = Object.assign(new PessoaResult(), result);
          if (result.success) {
            return new PessoaIncluirOk({ result: result });
          }
          return new PessoaIncluirErro({ error: result.message, result: result });
        }),
        catchError((error) => {
          this.spinnerService.hide();
          return of(new PessoaIncluirErro({ error: error }));
        })
      );
    }),
  );

  @Effect()
  excluirPessoa: Observable<any> = this.actions.pipe(
    ofType(PessoaActionTypes.EXCLUIR),
    map((action: PessoaExcluir) => action.payload),
    switchMap(payload => {
      this.spinnerService.show();
      return this.pessoaService.excluir(payload.id).pipe(
        map((result: WsResult) => {
          this.spinnerService.hide();
          result = Object.assign(new WsResult(), result);
          if (result.success) {
            return new PessoaExcluirOk({ result: result });
          }
          return new PessoaExcluirErro({ error: result.message, result: result });
        }),
        catchError((error) => {
          this.spinnerService.hide();
          return of(new PessoaExcluirErro({ error: error }));
        })
      );
    }),
  );


  @Effect({ dispatch: false })
  fail: Observable<any> = this.actions.pipe(
    ofType(
      PessoaActionTypes.PESQUISAR_ERRO,
      PessoaActionTypes.INCLUIR_ERRO,
      PessoaActionTypes.ALTERAR_ERRO,
      PessoaActionTypes.EXCLUIR_ERRO
    ),
    map((action: All) => action.payload),
    tap(payload => {
      this.toastrService.error(payload.error ? payload.error : 'Não foi possível efetuar a operação solicitada.');
    })
  );
}
