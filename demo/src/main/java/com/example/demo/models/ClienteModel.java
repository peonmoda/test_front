package com.example.demo.models;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "TB_CLIENT")
public class ClienteModel {

	@Column
	private String name;
	@Column
	@Id
	private Long cpf;
	@Column
	private String email;
	@Column
	private LocalDate birth;
	@Column
	private String telefone;


	@JoinTable(name = "TB_CLIENT_ADRESS",
	joinColumns = @JoinColumn(name = "CLIENTE_CPF"),
	inverseJoinColumns = @JoinColumn(name = "ADRESS_ID"))
	@OneToMany(cascade = CascadeType.ALL)
	private List<AdressModel> adress;
	
	public ClienteModel() {
		
	}
	
	public ClienteModel(String name, Long cpf, String email, LocalDate birth, String telefone) {
		this.name = name;
		this.cpf = cpf;
		this.email = email;
		this.birth = birth;
		this.telefone = telefone;
	}


	public String getName() {
		return name;
	}


	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public void setName(String name) {
		this.name = name;
	}


	public Long getCpf() {
		return cpf;
	}


	public void setCpf(Long cpf) {
		this.cpf = cpf;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public LocalDate getBirth() {
		return birth;
	}


	public void setBirth(LocalDate birth) {
		this.birth = birth;
	}


	public List<AdressModel> getAdress() {
		return adress;
	}


	public void setAdress(List<AdressModel> adress) {
		this.adress = adress;
	}


}
