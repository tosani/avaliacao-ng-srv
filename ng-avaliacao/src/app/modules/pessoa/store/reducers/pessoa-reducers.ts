import { ListarPessoaResult, PessoaResult } from 'src/app/model/pessoa';
import { WsResult } from 'src/app/model/ws-result';
import { All, PessoaActionTypes } from '../actions/pessoa-actions';

export interface PessoaState {
  pesquisarResult: ListarPessoaResult;
  alterarResult: PessoaResult;
  incluirResult: PessoaResult;
  excluirResult: WsResult;
}

export const initialState: PessoaState = {
  pesquisarResult: null,
  alterarResult: null,
  incluirResult: null,
  excluirResult: null
}

export function reducers(state = initialState, action: All): PessoaState {
  switch (action.type) {
    case PessoaActionTypes.PESQUISAR: {
      return {
        ...state,
        pesquisarResult: null,
        alterarResult: null,
        excluirResult: null,
        incluirResult: null
      };
    }

    case PessoaActionTypes.PESQUISAR_OK: {
      return {
        ...state,
        pesquisarResult: action.payload.result
      };
    }
    case PessoaActionTypes.PESQUISAR_ERRO: {
      return {
        ...state,
        pesquisarResult: null
      };
    }

    case PessoaActionTypes.ALTERAR: {
      return {
        ...state,
        alterarResult: null
      };
    }

    case PessoaActionTypes.ALTERAR_OK: {
      return {
        ...state,
        alterarResult: action.payload.result
      };
    }


    case PessoaActionTypes.ALTERAR_ERRO: {
      return {
        ...state,
        alterarResult: null
      };
    }

    case PessoaActionTypes.INCLUIR: {
      return {
        ...state,
        incluirResult: null
      };
    }

    case PessoaActionTypes.INCLUIR_OK: {
      return {
        ...state,
        incluirResult: action.payload.result
      };
    }

    case PessoaActionTypes.INCLUIR_ERRO: {
      return {
        ...state,
        incluirResult: null
      };
    }

    case PessoaActionTypes.EXCLUIR: {
      return {
        ...state,
        excluirResult: null
      };
    }

    case PessoaActionTypes.EXCLUIR_OK: {
      return {
        ...state,
        excluirResult: action.payload.result
      };
    }

    case PessoaActionTypes.EXCLUIR_ERRO: {
      return {
        ...state,
        excluirResult: null
      };
    }


    default: {
      return state;
    }
  }
}
