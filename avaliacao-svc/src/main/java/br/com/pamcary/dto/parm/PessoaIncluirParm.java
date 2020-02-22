package br.com.pamcary.dto.parm;

import java.util.Date;

import org.apache.commons.beanutils.BeanUtils;

import br.com.pamcary.model.PessoaFisica;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(description = "Dados da pessoa para inclusão")
public class PessoaIncluirParm {

	@ApiModelProperty("Nome da pessoa")
	private String nome;
	
	@ApiModelProperty("CPF da pessoa")
	private String cpf;
	
	@ApiModelProperty("Data de Nascimento da pessoa")
	private Date dataNascimento;

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

	public PessoaFisica parse() throws Exception {
		PessoaFisica pf = new PessoaFisica();
		BeanUtils.copyProperties(pf, this);
		return pf;
	}

}
