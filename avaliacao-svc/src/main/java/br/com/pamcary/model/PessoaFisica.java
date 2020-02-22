package br.com.pamcary.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.apache.commons.lang3.StringUtils;

@Entity
@Table(name = "PESSO_FISICA")
public class PessoaFisica {

	@Id
	@Column(name = "CODIGO")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_pessoa_fisica")
	@SequenceGenerator(name = "sequence_pessoa_fisica", sequenceName = "sequence_pessoa_fisica", allocationSize = 1)
	private Integer id;

	@Column(name = "NOME", length = 60, nullable = false)
	private String nome;

	@Column(name = "CPF", length = 11, nullable = false)
	private String cpf;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "DATA_NASCIMENTO")
	private Date dataNascimento;

	public PessoaFisica() {
	}

	public PessoaFisica(String nome, String cpf, Date dataNascimento) {
		super();
		this.nome = nome;
		this.cpf = cpf;
		this.dataNascimento = dataNascimento;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
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
		if (StringUtils.isNoneBlank(cpf)) {
			this.cpf = cpf.replaceAll("[^0-9]", "");
		}
	}

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((cpf == null) ? 0 : cpf.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PessoaFisica other = (PessoaFisica) obj;
		if (cpf == null) {
			if (other.cpf != null)
				return false;
		} else if (!cpf.equals(other.cpf))
			return false;
		return true;
	}
}
