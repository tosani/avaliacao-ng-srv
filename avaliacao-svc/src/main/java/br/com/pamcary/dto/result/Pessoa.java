package br.com.pamcary.dto.result;

import java.util.Date;

import org.apache.commons.beanutils.BeanUtils;

import br.com.pamcary.model.PessoaFisica;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(description = "Detalhes sobre uma pessoa")
public class Pessoa {

	@ApiModelProperty("Identificador da pessoa")
	private Long id;

	@ApiModelProperty("Nome da pessoa")
	private String nome;

	@ApiModelProperty("CPF da pessoa")
	private String cpf;

	@ApiModelProperty("Data de nascimento da pessoa")
	private Date dataNascimento;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public static Pessoa parse(PessoaFisica p) throws Exception {
		Pessoa pessoa = new Pessoa();
		BeanUtils.copyProperties(pessoa, p);
		return pessoa;
	}

}
