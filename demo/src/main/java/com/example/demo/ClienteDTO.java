package com.example.demo;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.models.AdressModel;

public class ClienteDTO {
	
	private String name;
	private String email;
	private Long cpf;
	private LocalDate birth;
	private String telefone;
	private List<AdressModel> adress;
	

	public ClienteDTO(String name, String email, Long cpf, LocalDate birth, String telefone, List<AdressModel> adress) {
		super();
		this.name = name;
		this.email = email;
		this.cpf = cpf;
		this.birth = birth;
		this.adress = adress;
		this.telefone = telefone;
	}
	
	
	public String getTelefone() {
		return telefone;
	}


	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}


	public List<AdressModel> getAdress() {
		return adress;
	}
	public void setAdress(List<AdressModel> adress) {
		this.adress = adress;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Long getCpf() {
		return cpf;
	}
	public void setCpf(Long cpf) {
		this.cpf = cpf;
	}
	public LocalDate getBirth() {
		return birth;
	}
	public void setBirth(LocalDate birth) {
		this.birth = birth;
	}
	
	
	
	
}
