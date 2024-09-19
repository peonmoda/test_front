import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Clienteclass } from '../../models/clienteclass';

@Component({
  selector: 'app-lista-service-mock',
  templateUrl: './lista-service-mock.component.html',
  styleUrl: './lista-service-mock.component.scss'
})
export class ListaServiceMockComponent {

   mockCliente: Clienteclass = {
    "name": "João Silva",
    "cpf": 1,
    "email": "joao.silva@example.com",
    "birth": "1990-05-15",
    "telefone": "",
    "adress": [
      {
        "tipo": "Residencial",
        "logradouro": "Rua das Flores",
        "complemento": "Apto 101",
        "municipio": "São Paulo",
        "bairro": "Centro",
        "estado": "SP",
        "numero": '123',
        "cep": "01001-000"
      },
      {
        "tipo": "Comercial",
        "logradouro": "Avenida Paulista",
        "complemento": "Sala 501",
        "municipio": "São Paulo",
        "bairro": "Bela Vista",
        "estado": "SP",
        "numero": '2000',
        "cep": "01310-100"
      }
    ]
  };

  list() {
    return of([this.mockCliente]);
  }

  addCliente(cliente: Clienteclass): Observable<Clienteclass> {
    return of(cliente);
  }

  removeCliente(cliente: Clienteclass): Observable<any> {
    return of(cliente);
  }

  buscarCliente(cliente: Clienteclass): Observable<any> {
    return of(cliente);
  }

  alterarCliente(cliente: Clienteclass): Observable<Clienteclass> {
    return of(cliente);
  }

  alterarEndereco(cliente: Clienteclass): Observable<Clienteclass> {
    return of(cliente);
  }
}
