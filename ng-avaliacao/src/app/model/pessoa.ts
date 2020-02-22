import { WsResult } from './ws-result';

export class ListarPessoaResult extends WsResult {
    payload: Pessoa[];
}

export class Pessoa {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: string;
}


export class IncluirPessoaParam {
    nome: string;
    cpf: string;
    dataNascimento: string;
}

export class AlterarPessoaParam extends IncluirPessoaParam {
    id: number;
}

export class PessoaResult extends WsResult {
    payload: Pessoa;
}