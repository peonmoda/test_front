package com.example.demo.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.models.AdressModel;
import com.example.demo.models.ClienteModel;
import com.example.demo.repository.AdressRepository;
import com.example.demo.repository.ClienteRepository;

@Component
public class ClienteService {

	@Autowired
	private ClienteRepository clienteRepository;
	@Autowired
	private AdressRepository adressRepository;

	public boolean inserirCliente(String nome, Long cpf, String email, LocalDate nascimento,String telefone, List<AdressModel> adress) {
		if (clienteRepository.findByCpf(cpf).isPresent() || nascimento.isAfter(LocalDate.now())) {
			return false;
		}
		ClienteModel cliente = new ClienteModel(nome, cpf, email, nascimento,telefone);
		cliente.setAdress(new ArrayList<AdressModel>());
		cliente.getAdress().addAll(adress);
		clienteRepository.save(cliente);
		return true;

	}

	public Optional<ClienteModel> consultarCliente(Long cpf) {
		return clienteRepository.findByCpf(cpf);
	}

	public List<ClienteModel> todosClientes() {
		return clienteRepository.findAll();
	}

	public boolean alterarCliente(String nome, Long cpf, String email, LocalDate nascimento,String telefone) {
		if (clienteRepository.findByCpf(cpf) == null) {
			return false;
		}
		Optional<ClienteModel> cliente = clienteRepository.findByCpf(cpf);
		cliente.get().setName(nome);
		cliente.get().setEmail(email);
		cliente.get().setBirth(nascimento);
		cliente.get().setTelefone(telefone);
		clienteRepository.save(cliente.get());
		return true;

	}

	public boolean excluirCliente(Long cpf) {
		if (clienteRepository.findByCpf(cpf).isEmpty()) {
			return false;
		}
		clienteRepository.delete(clienteRepository.findByCpf(cpf).get());
		return true;
	}

	// Funcoes para cliente ja cadastrado, tratar como modal
	public boolean inserirEndereco(List<AdressModel> adress, Long cpf) {
		if (clienteRepository.findByCpf(cpf) == null) {
			return false;
		}
		ClienteModel cliente = clienteRepository.findByCpf(cpf).get();
		cliente.getAdress().clear();
		cliente.getAdress().addAll(adress);
		clienteRepository.save(cliente);
		return true;

	}

	public boolean removerEndereco(AdressModel adress, Long cpf) {
		if (clienteRepository.findByCpf(cpf) == null) {
			return false;
		}
		ClienteModel cliente = clienteRepository.findByCpf(cpf).get();
		for(int i = 0; i < cliente.getAdress().size(); i++) {
			if(cliente.getAdress().get(i).getId() == adress.getId()) {
				cliente.getAdress().remove(i);
				break;
			}
		}
		clienteRepository.save(cliente);
		return true;

	}

	public boolean atualizarEndereco(AdressModel adress, Long cpf) {
		if (clienteRepository.findByCpf(cpf) == null) {
			return false;
		}
		ClienteModel cliente = clienteRepository.findByCpf(cpf).get();
		for (int i = 0; i < cliente.getAdress().size(); i++) {
			AdressModel a = cliente.getAdress().get(i);
			if (a.getId().equals(adress.getId())) {
				cliente.getAdress().set(i, adress);
				break;
			}
		}
		clienteRepository.save(cliente);
		return true;

	}
}
