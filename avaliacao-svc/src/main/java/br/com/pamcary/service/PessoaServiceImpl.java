package br.com.pamcary.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pamcary.model.PessoaFisica;
import br.com.pamcary.repository.PessoaRepository;

@Service
@Transactional(value = TxType.REQUIRED, rollbackOn = Throwable.class)
public class PessoaServiceImpl implements PessoaService {

	@Autowired
	PessoaRepository repository;

	@Override
	public PessoaFisica getPessoa(Integer id) {
		Validate.notNull(id, "Id inválido");
		Optional<PessoaFisica> promessa = repository.findById(id);
		Validate.isTrue(promessa.isPresent(), "Id inválido");
		return promessa.get();
	}

	@Override
	@Transactional(value = TxType.REQUIRED, rollbackOn = Throwable.class)
	public PessoaFisica incluir(PessoaFisica pessoaFisica) {
		validar(pessoaFisica);
		List<PessoaFisica> pessoasCpf = repository.findByCpf(pessoaFisica.getCpf());
		Validate.isTrue(pessoasCpf.isEmpty(), "Ja existe uma pessoa cadastrada com o CPF informado");
		return repository.saveAndFlush(pessoaFisica);
	}

	@Override
	@Transactional(value = TxType.REQUIRED, rollbackOn = Throwable.class)
	public PessoaFisica alterar(PessoaFisica pessoaFisica) {
		validar(pessoaFisica);
		Optional<PessoaFisica> promessa = repository.findById(pessoaFisica.getId());
		Validate.isTrue(promessa.isPresent(), "Pessoa não encontrada");
		List<PessoaFisica> pessoasCpf = repository.findByCpf(pessoaFisica.getCpf());
		Validate.isTrue(pessoasCpf.isEmpty() || pessoasCpf.get(0).getId().equals(pessoaFisica.getId()), "Ja existe uma pessoa cadastrada com o CPF informado");
		return repository.saveAndFlush(pessoaFisica);
	}

	@Override
	@Transactional(value = TxType.REQUIRED, rollbackOn = Throwable.class)
	public void excluir(Integer id) {
		Validate.notNull(id, "Id inválido");
		Optional<PessoaFisica> promessa = repository.findById(id);
		Validate.isTrue(promessa.isPresent(), "Id inválido");

		repository.delete(promessa.get());
	}

	@Override
	public List<PessoaFisica> listar() {
		return repository.findAll();
	}

	@Override
	public List<PessoaFisica> pesquisar(String cpf, String nome) {
		if (StringUtils.isNoneBlank(cpf)) {
			cpf = cpf.replaceAll("[^0-9]", "");
		}
		Validate.isTrue(StringUtils.isNotBlank(cpf) || StringUtils.isNotBlank(nome), "Informe pelo menos o cpf ou o nome");
		if (StringUtils.isNotBlank(cpf) && StringUtils.isNotBlank(nome)) {
			return repository.findByCpfAndNomeIgnoreCaseContaining(cpf, nome);
		} else if (StringUtils.isNotBlank(cpf)) {
			return repository.findByCpf(cpf);
		} else {
			return repository.findByNomeIgnoreCaseContaining(nome);
		}
	}

	private void validar(PessoaFisica pessoaFisica) {
		Validate.notNull(pessoaFisica, "Parâmetros inválidos");
		Validate.notBlank(pessoaFisica.getNome(), "Nome inválido");
		Validate.notBlank(pessoaFisica.getCpf(), "CPF inválido");
		Validate.isTrue(pessoaFisica.getCpf().length() <= 11, "CPF inválido");
	}

}
