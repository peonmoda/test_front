import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { HttpClient } from '@angular/common/http';
import { delay, first, Observable,  } from 'rxjs';
import { Clienteclass } from '../models/clienteclass';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor(private httpClient : HttpClient) { }

  private readonly API = 'http://localhost:8080/buscartodosclientes';
  private readonly apiUrl = 'http://localhost:8080/inserircliente';
  private readonly removeApi = 'http://localhost:8080/removercliente';
  private readonly buscaClienteApi = 'http://localhost:8080/buscarcliente';
  private readonly alterarClienteApi = 'http://localhost:8080/atualizarcliente';
  private readonly alterarEnderecoApi = 'http://localhost:8080/adicionarendereco';

  list() {
    return this.httpClient.get<Cliente[]>(this.API).pipe(
    first());
  }

  addCliente(cliente: Clienteclass): Observable<Clienteclass> {
    return this.httpClient.post<Clienteclass>(this.apiUrl, cliente);
  }

  removeCliente(cliente: Clienteclass): Observable<any> {
    return this.httpClient.request('DELETE', this.removeApi, {
      body: cliente
    });
  }

  buscarCliente(cliente: Clienteclass): Observable<any> {
    const url = this.buscaClienteApi + '/' + cliente.cpf;
    return this.httpClient.get(url);
  }

  alterarCliente(cliente: Clienteclass): Observable<Clienteclass> {
    return this.httpClient.post<Clienteclass>(this.alterarClienteApi, cliente);
  }

  alterarEndereco(cliente: Clienteclass): Observable<Clienteclass> {
    return this.httpClient.post<Clienteclass>(this.alterarEnderecoApi, cliente);
  }

}
