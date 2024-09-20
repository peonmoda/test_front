import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private reloadClientesSubject = new Subject<void>();

  reloadClientes$ = this.reloadClientesSubject.asObservable();

  triggerReloadClientes() {
    this.reloadClientesSubject.next();
  }

}
