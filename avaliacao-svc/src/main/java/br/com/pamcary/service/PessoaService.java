package br.com.pamcary.service;

import java.util.List;

import br.com.pamcary.model.PessoaFisica;

public interface PessoaService {

	/**
	 * Obtem uma pessoa por ID
	 * 
	 * @param id
	 * @return
	 */
	PessoaFisica getPessoa(Integer id);

	/**
	 * Inclui uma nova pessoa
	 * 
	 * @param pessoaFisica
	 * @return
	 */
	PessoaFisica incluir(PessoaFisica pessoaFisica);

	/**
	 * Altera os dados de uma pessoa ja existente.
	 * 
	 * @param pessoaFisica
	 * @return
	 */
	PessoaFisica alterar(PessoaFisica pessoaFisica);

	/**
	 * Exclui uma pessoa cadastrada
	 * 
	 * @param id
	 */
	void excluir(Integer id);

	/**
	 * Lista todas as pessoas cadastradas
	 * 
	 * @return
	 */
	List<PessoaFisica> listar();

	/**
	 * Pesquisa pessoas cadastradas por CPF ou Nome
	 * 
	 * @param cpf
	 * @param nome
	 * @return
	 */
	List<PessoaFisica> pesquisar(String cpf, String nome);

}
