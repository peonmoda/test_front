package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.ClienteDTO;
import com.example.demo.models.ClienteModel;
import com.example.demo.services.ClienteService;

@RestController
public class ClientController {

	@Autowired
	ClienteService clienteService;

	@PostMapping("/inserircliente")
	public ResponseEntity<ClienteDTO> inserirCliente(@RequestBody ClienteDTO cliente) {
		if (clienteService.inserirCliente(cliente.getName(), cliente.getCpf(), cliente.getEmail(), cliente.getBirth(),
				cliente.getTelefone(), cliente.getAdress())) {
			return ResponseEntity.status(HttpStatus.OK).body(cliente);
		}
		return ResponseEntity.status(HttpStatus.CONFLICT).body(cliente);
	}

	@DeleteMapping("/removercliente")
	public ResponseEntity<ClienteDTO> removerCliente(@RequestBody ClienteDTO cliente) {
		if (clienteService.excluirCliente(cliente.getCpf())) {
			return ResponseEntity.status(HttpStatus.OK).body(cliente);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(cliente);
	}

	@PostMapping("/atualizarcliente")
	public ResponseEntity<ClienteDTO> atualizarCliente(@RequestBody ClienteDTO cliente) {
		if (clienteService.alterarCliente(cliente.getName(), cliente.getCpf(), cliente.getEmail(), cliente.getBirth(),
				cliente.getTelefone())) {
			return ResponseEntity.status(HttpStatus.OK).body(cliente);
		}
		return ResponseEntity.status(HttpStatus.CONFLICT).body(cliente);

	}

	@GetMapping("/buscarcliente/{cpf}")
	public ResponseEntity<ClienteModel> buscarCliente(@PathVariable String cpf) {
		Optional<ClienteModel> cliente = clienteService.consultarCliente(Long.parseLong(cpf));
		System.out.println(cliente.get().getCpf());
		if (cliente.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		return ResponseEntity.ok(cliente.get());
	}

	@GetMapping("/buscartodosclientes")
	public ResponseEntity<List<ClienteModel>> buscarTodosCliente() {
		return ResponseEntity.ok(clienteService.todosClientes());
	}

	@PostMapping("/adicionarendereco")
	public ResponseEntity<ClienteDTO> adicionarEndereco(@RequestBody ClienteDTO cliente) {
		if (clienteService.inserirEndereco(cliente.getAdress(), cliente.getCpf())) {
			return ResponseEntity.status(HttpStatus.OK).body(cliente);
		}
		return ResponseEntity.status(HttpStatus.CONFLICT).body(cliente);
	}

}
