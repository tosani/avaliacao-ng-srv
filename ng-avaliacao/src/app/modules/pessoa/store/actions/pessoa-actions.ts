import { Action } from '@ngrx/store';

export enum PessoaActionTypes {
  PESQUISAR = '[Pessoa] Pesquisar',
  PESQUISAR_OK = '[Pessoa] Pesquisar - OK',
  PESQUISAR_ERRO = '[Pessoa] Pesquisar - ERRO',

  INCLUIR = '[Pessoa] Incluir',
  INCLUIR_OK = '[Pessoa] Incluir - OK',
  INCLUIR_ERRO = '[Pessoa] Incluir - ERRO',

  ALTERAR = '[Pessoa] Alterar',
  ALTERAR_OK = '[Pessoa] Alterar - OK',
  ALTERAR_ERRO = '[Pessoa] Alterar - ERRO',

  EXCLUIR = '[Pessoa] Excluir',
  EXCLUIR_OK = '[Pessoa] Excluir - OK',
  EXCLUIR_ERRO = '[Pessoa] Excluir - ERRO'
}

export class PessoaPesquisar implements Action {
  readonly type: string = PessoaActionTypes.PESQUISAR;
  constructor(public payload: any) {
  }
}

export class PessoaPesquisarOk implements Action {
  readonly type: string = PessoaActionTypes.PESQUISAR_OK;
  constructor(public payload: any) {
  }
}

export class PessoaPesquisarErro implements Action {
  readonly type: string = PessoaActionTypes.PESQUISAR_ERRO;
  constructor(public payload: any) {
  }
}

export class PessoaAlterar implements Action {
  readonly type: string = PessoaActionTypes.ALTERAR;
  constructor(public payload: any) {
  }
}

export class PessoaAlterarOk implements Action {
  readonly type: string = PessoaActionTypes.ALTERAR_OK;
  constructor(public payload: any) {
  }
}

export class PessoaAlterarErro implements Action {
  readonly type: string = PessoaActionTypes.ALTERAR_ERRO;
  constructor(public payload: any) {
  }
}

export class PessoaIncluir implements Action {
  readonly type: string = PessoaActionTypes.INCLUIR;
  constructor(public payload: any) {
  }
}

export class PessoaIncluirOk implements Action {
  readonly type: string = PessoaActionTypes.INCLUIR_OK;
  constructor(public payload: any) {
  }
}

export class PessoaIncluirErro implements Action {
  readonly type: string = PessoaActionTypes.INCLUIR_ERRO;
  constructor(public payload: any) {
  }
}

export class PessoaExcluir implements Action {
  readonly type: string = PessoaActionTypes.EXCLUIR;
  constructor(public payload: any) {
  }
}

export class PessoaExcluirOk implements Action {
  readonly type: string = PessoaActionTypes.EXCLUIR_OK;
  constructor(public payload: any) {
  }
}

export class PessoaExcluirErro implements Action {
  readonly type: string = PessoaActionTypes.EXCLUIR_ERRO;
  constructor(public payload: any) {
  }
}


export type All =
  PessoaPesquisar
  | PessoaPesquisarOk
  | PessoaPesquisarErro
  | PessoaAlterar
  | PessoaAlterarOk
  | PessoaAlterarErro
  | PessoaIncluir
  | PessoaIncluirOk
  | PessoaIncluirErro
  | PessoaExcluir
  | PessoaExcluirOk
  | PessoaExcluirErro
  ;
