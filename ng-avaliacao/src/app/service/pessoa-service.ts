import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlterarPessoaParam, IncluirPessoaParam, ListarPessoaResult, PessoaResult } from '../model/pessoa';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class PessoaService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    buildEndpoint(parms: string): string {
        return `${this.getBaseServiceUrl()}/api/v01/pessoas/${parms}`;
    }

    pesquisar(cpf: string = '', nome: string = ''): Observable<ListarPessoaResult> {
        const params: any = {
            cpf: cpf,
            nome: nome
        };
        return this.http.get<ListarPessoaResult>(this.buildEndpoint(""), { params: params });
    }

    incluir(pessoa: IncluirPessoaParam): Observable<PessoaResult> {
        return this.http.post<PessoaResult>(this.buildEndpoint(""), JSON.stringify(pessoa));
    }

    alterar(pessoa: AlterarPessoaParam): Observable<PessoaResult> {
        return this.http.put<PessoaResult>(this.buildEndpoint(""), JSON.stringify(pessoa));
    }

    excluir(idPessoa: number): Observable<PessoaResult> {
        return this.http.delete<PessoaResult>(this.buildEndpoint(String(idPessoa)));
    }

}
