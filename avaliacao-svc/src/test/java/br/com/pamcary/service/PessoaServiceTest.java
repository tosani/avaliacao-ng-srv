package br.com.pamcary.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.text.ParseException;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.commons.lang3.time.DateUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import br.com.pamcary.model.PessoaFisica;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@Rollback(true)
public class PessoaServiceTest {

	@Autowired
	private PessoaService pessoaService;

	@Test
	@Rollback(true)
	public void listarPessoasSemParametro() {
		listarPessoasAssertResult();
	}

	@Test
	@Rollback(true)
	public void buscarPessoaExistentePorCpf() {
		List<PessoaFisica> list = listarPessoasAssertResult();
		List<PessoaFisica> result = pessoaService.pesquisar(list.get(0).getCpf(), null);
		assertNotNull("Deve retornar resultados", result);
		assertTrue("Deve retornar resultados", !result.isEmpty());
	}

	@Test
	@Rollback(true)
	public void buscarPessoaExistentePorNome() {
		List<PessoaFisica> list = listarPessoasAssertResult();
		List<PessoaFisica> result = pessoaService.pesquisar(null, list.get(0).getNome());
		assertNotNull("Deve retornar resultados", result);
		assertTrue("Deve retornar resultados", !result.isEmpty());
	}

	@Test
	@Rollback(true)
	public void buscarPessoaExistentePorCpfENome() {
		List<PessoaFisica> list = listarPessoasAssertResult();
		PessoaFisica pessoa = list.get(0);
		List<PessoaFisica> result = pessoaService.pesquisar(pessoa.getCpf(), pessoa.getNome());
		assertNotNull("Deve retornar resultados", result);
		assertTrue("Deve retornar resultados", !result.isEmpty());
	}

	@Test
	@Rollback(true)
	public void incluirPessoa() throws ParseException {
		PessoaFisica pf = new PessoaFisica();
		pf.setNome("Jose Silva");
		pf.setCpf("12345678925");
		pf.setDataNascimento(DateUtils.parseDate("01/01/1980", "dd/MM/yyyy"));
		PessoaFisica salva = pessoaService.incluir(pf);
		assertNotNull("A pessoa gravada deve ser retornada", salva);
		assertNotNull("O Id não deve ser nulo", salva.getId());
		assertEquals("O Nome deve ser igual o informado", pf.getNome(), salva.getNome());
		assertEquals("O CPF deve ser igual o informado", pf.getCpf(), salva.getCpf());
		assertEquals("O Data de Nascimento deve ser igual o informado", pf.getDataNascimento(), salva.getDataNascimento());
	}

	@Test(expected = Exception.class)
	@Rollback(true)
	public void incluirPessoaCpfExistente() throws ParseException {
		List<PessoaFisica> listaPessoas = listarPessoasAssertResult();
		PessoaFisica pf = new PessoaFisica();
		pf.setNome("Jose Silva");
		pf.setCpf(listaPessoas.get(0).getCpf());
		pf.setDataNascimento(DateUtils.parseDate("01/01/1980", "dd/MM/yyyy"));
		pessoaService.incluir(pf);
	}

	@Test(expected = Exception.class)
	@Rollback(true)
	public void incluirPessoaSemNome() throws ParseException {
		PessoaFisica pf = new PessoaFisica();
		pf.setNome(null);
		pf.setCpf("12345678925");
		pf.setDataNascimento(DateUtils.parseDate("01/01/1980", "dd/MM/yyyy"));
		pessoaService.incluir(pf);
	}

	@Test(expected = Exception.class)
	@Rollback(true)
	public void incluirPessoaSemCpf() throws ParseException {
		PessoaFisica pf = new PessoaFisica();
		pf.setNome("Jose Silva");
		pf.setCpf(null);
		pf.setDataNascimento(DateUtils.parseDate("01/01/1980", "dd/MM/yyyy"));
		pessoaService.incluir(pf);
	}

	@Test()
	@Rollback(true)
	public void incluirPessoaSemDataNascimento() throws ParseException {
		PessoaFisica pf = new PessoaFisica();
		pf.setNome("Jose Silva");
		pf.setCpf("12345678925");
		pf.setDataNascimento(null);
		pessoaService.incluir(pf);
	}

	@Test(expected = Exception.class)
	@Rollback(true)
	public void incluirPessoaCpfTamanhoInvalido() throws ParseException {
		PessoaFisica pf = new PessoaFisica();
		pf.setNome("Jose Silva");
		pf.setCpf("1234567891561564654");
		pf.setDataNascimento(null);
		pessoaService.incluir(pf);
	}

	@Test
	@Rollback(true)
	public void alterarPessoa() throws ParseException {
		List<PessoaFisica> pessoas = listarPessoasAssertResult();
		PessoaFisica pf = pessoas.get(pessoas.size() - 1);
		pf.setNome("Maria Oliveira");
		pf.setCpf("99999999911");
		pf.setDataNascimento(DateUtils.parseDate("01/01/1980", "dd/MM/yyyy"));
		PessoaFisica salva = pessoaService.alterar(pf);
		assertNotNull("A pessoa gravada deve ser retornada", salva);
		assertNotNull("O Id não deve ser nulo", salva.getId());
		assertEquals("O Nome deve ser igual o informado", pf.getNome(), salva.getNome());
		assertEquals("O CPF deve ser igual o informado", pf.getCpf(), salva.getCpf());
		assertEquals("O Data de Nascimento deve ser igual o informado", pf.getDataNascimento(), salva.getDataNascimento());
	}

	@Test(expected = Exception.class)
	@Rollback(true)
	public void alterarPessoaIdInexistente() throws ParseException {
		List<PessoaFisica> pessoas = listarPessoasAssertResult();
		PessoaFisica pf = pessoas.get(pessoas.size() - 1);
		pf.setId(-1);
		pf.setDataNascimento(DateUtils.parseDate("01/01/1980", "dd/MM/yyyy"));
		pessoaService.alterar(pf);
	}

	@Test(expected = Exception.class)
	@Rollback(true)
	public void alterarPessoaCpfExistenteOutraPessoa() throws Exception {
		List<PessoaFisica> pessoas = listarPessoasAssertResult();
		if (pessoas.size() == 1) {
			throw new Exception("Não tem outra pessoa. Ok");
		}
		PessoaFisica pf = pessoas.get(pessoas.size() - 1);
		PessoaFisica pfOutro = pessoas.get(0);
		pf.setCpf(pfOutro.getCpf());
		pessoaService.alterar(pf);

	}

	@Test(expected = Exception.class)
	@Rollback(true)
	public void alterarPessoaParaSemNome() throws Exception {
		List<PessoaFisica> pessoas = listarPessoasAssertResult();
		PessoaFisica pf = pessoas.get(pessoas.size() - 1);
		pf.setNome(null);
		pessoaService.alterar(pf);

	}

	@Test(expected = Exception.class)
	@Rollback(true)
	public void alterarPessoaParaSemCpf() throws Exception {
		List<PessoaFisica> pessoas = listarPessoasAssertResult();
		PessoaFisica pf = pessoas.get(pessoas.size() - 1);
		pf.setCpf(null);
		pessoaService.alterar(pf);

	}

	@Test
	@Rollback(true)
	public void alterarPessoaParaSemDataNascimento() throws ParseException {
		List<PessoaFisica> pessoas = listarPessoasAssertResult();
		PessoaFisica pf = pessoas.get(pessoas.size() - 1);
		pf.setDataNascimento(null);
		PessoaFisica salva = pessoaService.alterar(pf);
		assertNotNull("A pessoa gravada deve ser retornada", salva);
		assertNotNull("O Id não deve ser nulo", salva.getId());
		assertEquals("O ID deve ser igual o informado", pf.getId(), salva.getId());
		assertEquals("O Nome deve ser igual o informado", pf.getNome(), salva.getNome());
		assertEquals("O CPF deve ser igual o informado", pf.getCpf(), salva.getCpf());
		assertEquals("O Data de Nascimento deve ser igual o informado", pf.getDataNascimento(), salva.getDataNascimento());
	}

	@Test
	@Rollback(true)
	public void excluirPessoaIdExistente() throws ParseException {
		List<PessoaFisica> pessoas = listarPessoasAssertResult();
		PessoaFisica pf = pessoas.get(pessoas.size() - 1);
		pessoaService.excluir(pf.getId());
		PessoaFisica pessoaExcluida = null;
		try {
			pessoaExcluida = pessoaService.getPessoa(pf.getId());
		} catch (IllegalArgumentException e) {
			// OK;
		}
		assertNull("A pessoa excluída não deve estar mais disponível", pessoaExcluida);
	}

	@Test(expected = Exception.class)
	@Rollback(true)
	public void excluirPessoaIdNaoExistente() throws ParseException {
		pessoaService.excluir(-1);
	}

	@Test(expected = Exception.class)
	@Rollback(true)
	public void excluirPessoaIdNull() throws ParseException {
		pessoaService.excluir(null);
	}

	private List<PessoaFisica> listarPessoasAssertResult() {
		List<PessoaFisica> list = pessoaService.listar();
		assertNotNull("Deve retornar resultados", list);
		assertTrue("Deve retornar resultados", !list.isEmpty());
		return list;
	}

}
