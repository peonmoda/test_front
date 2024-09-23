import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private _http: HttpClient) { }

  addPessoa(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/pessoa', data);
  }

  updatePessoa(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/pessoa/${id}`, data);
  }

  
  getPessoaList(): Observable<any> {
    return this._http.get('http://localhost:3000/pessoa');
  }
  
  getPessoaInfo(id: number, data: any): Observable<any> {
    return this._http.get(`http://localhost:3000/pessoa/${id}`);
  }
  
  deletePessoa(id: number): Observable<any>{
    return this._http.delete(`http://localhost:3000/pessoa/${id}`);
  }

}
