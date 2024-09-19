package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.ClienteModel;

public interface ClienteRepository extends JpaRepository<ClienteModel,Long>{
	
	Optional<ClienteModel> findByCpf(Long cpf);
}
