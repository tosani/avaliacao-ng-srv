package br.com.pamcary.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.pamcary.model.PessoaFisica;

public interface PessoaRepository extends JpaRepository<PessoaFisica, Integer> {

	List<PessoaFisica> findByCpfAndNomeIgnoreCaseContaining(String cpf, String nome);

	List<PessoaFisica> findByNomeIgnoreCaseContaining(String nome);

	List<PessoaFisica> findByCpf(String cpf);
}
