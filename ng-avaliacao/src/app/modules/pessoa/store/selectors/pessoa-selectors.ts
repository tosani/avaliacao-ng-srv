import { createSelector } from '@ngrx/store';
import * as fromPessoa from '../reducers/pessoa-reducers';
import { getPessoaModuloState, PessoaModuloState } from './../reducers/index';


export const getPessoaState = createSelector(getPessoaModuloState, (state: PessoaModuloState) => state.pessoas);

export const getPesquisaResult = createSelector(getPessoaState, (state: fromPessoa.PessoaState) => state.pesquisarResult);
export const getAlteracaoResult = createSelector(getPessoaState, (state: fromPessoa.PessoaState) => state.alterarResult);
export const getInclusaoResult = createSelector(getPessoaState, (state: fromPessoa.PessoaState) => state.incluirResult);
export const getExclusaoResult = createSelector(getPessoaState, (state: fromPessoa.PessoaState) => state.excluirResult);
