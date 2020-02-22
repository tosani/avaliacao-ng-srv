package br.com.pamcary.dto.parm;

import br.com.pamcary.model.PessoaFisica;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(description = "Dados da pessoa para alteração")
public class PessoaAlterarParm extends PessoaIncluirParm {

	@ApiModelProperty("Identificador da pessoa a ser alterada")
	public Integer id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Override
	public PessoaFisica parse() throws Exception {
		return super.parse();
	}

}
