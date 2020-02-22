package br.com.pamcary.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.pamcary.dto.StatusResult;
import br.com.pamcary.dto.parm.PessoaAlterarParm;
import br.com.pamcary.dto.parm.PessoaIncluirParm;
import br.com.pamcary.dto.result.Pessoa;
import br.com.pamcary.model.PessoaFisica;
import br.com.pamcary.service.PessoaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * Api para CRUD de Pessoas
 * 
 * @author Paulo Tosani
 *
 */
@CrossOrigin
@RestController
@RequestMapping("/api/v01/pessoas")
@Api(value = "Controle de cadastro de Pessoas")
public class PessoaController extends BaseRestController {
	private static final Log LOG = LogFactory.getLog(PessoaController.class);

	@Autowired
	private PessoaService service;

	@GetMapping("/{id}")
	@ApiOperation(value = "Busca uma pessoa de acordo com o Id informado")
	public ResponseEntity<StatusResult<Pessoa>> getPessoa(@PathVariable(name = "id", required = true) Integer id) {
		try {
			PessoaFisica pessoa = service.getPessoa(id);
			return prepareRestResponseSuccess(Pessoa.parse(pessoa));
		} catch (Exception e) {
			return prepareRestResponseError(e);
		}
	}

	/**
	 * Busca por nome ou CPF.<br/>
	 * Caso nenhum parametro for informado, lista todas as pessoas
	 * 
	 * @param cpf
	 * @param nome
	 * @return
	 */
	@GetMapping("/")
	@ApiOperation(value = "Pesquisa pessoas por Nome ou por CPF", notes = "Caso não informar nenhum parametro, sera retornará todas as pessoas cadastradas.")
	public ResponseEntity<StatusResult<List<Pessoa>>> pesquisar(
			@ApiParam(value = "CPF completo da pessoa a ser pesquisada", example = "12345678923") @RequestParam(required = false) String cpf,
			@ApiParam(value = "Nome completo ou parcial da pessoa a ser pesquisada", example = "João") @RequestParam(required = false) String nome) {
		try {
			List<PessoaFisica> lista = null;
			if (StringUtils.isBlank(cpf) && StringUtils.isBlank(nome)) {
				lista = service.listar();
			} else {
				lista = service.pesquisar(cpf, nome);
			}
			return prepararRespostaPesquisa(lista);
		} catch (Exception e) {
			return prepareRestResponseError(e);
		}
	}

	private ResponseEntity<StatusResult<List<Pessoa>>> prepararRespostaPesquisa(List<PessoaFisica> lista) {
		try {
			List<Pessoa> pessoasResult = new ArrayList<Pessoa>();
			for (PessoaFisica pessoa : lista) {
				try {
					pessoasResult.add(Pessoa.parse(pessoa));
				} catch (Exception e) {
					LOG.error(e);
					throw new Exception("Erro ao executar a operação");
				}
			}
			StatusResult<List<Pessoa>> result = new StatusResult<>();
			if (CollectionUtils.isEmpty(lista)) {
				result.setMessage("Nenhuma pessoa encontrada com os parametros informados");
			}
			result.setSuccess(true);
			result.setPayload(pessoasResult);
			return prepareRestResponseSuccess(result);
		} catch (Exception e) {
			return prepareRestResponseError(e);
		}
	}

	/**
	 * Inclui uma nova pessoa
	 * 
	 * @param pessoa
	 * @return
	 */
	@PostMapping("/")
	@ApiOperation(value = "Cadastra uma nova pessoa", notes = "Caso ja exista uma pessoa com o mesmo CPF, a operação sera recusada.")
	public ResponseEntity<StatusResult<Pessoa>> incluir(@ApiParam(value = "Dados da pessoa a ser cadastrada") @RequestBody(required = true) PessoaIncluirParm pessoa) {
		try {
			PessoaFisica saved = service.incluir(pessoa.parse());
			return prepareRestResponseSuccess(Pessoa.parse(saved));
		} catch (Exception e) {
			return prepareRestResponseError(e);
		}
	}

	/**
	 * Altera uma pessoa
	 * 
	 * @param pessoa
	 * @return
	 */
	@PutMapping("/")
	@ApiOperation(value = "Altera uma pessoa previamente cadastrada")
	public ResponseEntity<StatusResult<Pessoa>> alterar(@ApiParam(value = "Dados da pessoa a ser alterada") @RequestBody(required = true) PessoaAlterarParm pessoa) {
		try {
			PessoaFisica saved = service.alterar(pessoa.parse());
			return prepareRestResponseSuccess(Pessoa.parse(saved));
		} catch (Exception e) {
			return prepareRestResponseError(e);
		}
	}

	/**
	 * Exclui uma pessoa
	 * 
	 * @param pessoa
	 * @return
	 */
	@DeleteMapping("/{id}")
	@ApiOperation(value = "Exclui a pessoa com o ID informado")
	public ResponseEntity<StatusResult<Pessoa>> excluir(@ApiParam(value = "ID da pessoa a ser excluída", example = "1") @PathVariable(required = true) Integer id) {
		try {
			service.excluir(id);
			return prepareRestResponseSuccess(new StatusResult<>(true, "Pessoa excluída com sucesso"));
		} catch (Exception e) {
			return prepareRestResponseError(e);
		}
	}

}
