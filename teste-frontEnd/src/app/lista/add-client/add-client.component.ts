import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ListaService } from '../services/lista.service';
import { Clienteclass } from '../models/clienteclass';
import { catchError, of, tap } from 'rxjs';

import { Adress } from '../models/adress';
import { CepserviceService } from '../services/cepservice.service';
import { MatTabGroup } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';
import { UpdateService } from '../services/update.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})

export class AddClientComponent {

  @ViewChild('tabs') tabGroup!: MatTabGroup;
  formGroup: FormGroup;
  formGroupCliente: FormGroup;
  adress: Adress[] = [];
  dateFilter = (date: Date | null): boolean => {

    const today = new Date();
    return date ? date <= today : true;
  }
  matcher = new FormatError();
  adNew!: Adress;
  currentIndex = 0;
  private _snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder,
     public dialog: MatDialog,
      private listaService: ListaService,
      private cepService: CepserviceService,
      private dialogRef: MatDialogRef<AddClientComponent>,
      private clientService: UpdateService) {
    this.formGroupCliente = this.fb.group({
      nome: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, cpfValidator]],
      date: ['', Validators.required],
      telefone: ['']

    });
    this.formGroup = this.fb.group({
      tipo: [''],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      estado: ['', Validators.required],
      logradouro: ['', Validators.required],
      municipio: ['', Validators.required],
      bairro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['']
    });
  }

  toggle() {
    const totalTabs = this.tabGroup._tabs.length;
    this.currentIndex = (this.currentIndex + 1) % totalTabs;
    this.tabGroup.selectedIndex = this.currentIndex;
  }

  onTabChange(){
    if (this.tabGroup.selectedIndex == 0) {
      this.currentIndex = 0;
    }else{
      this.currentIndex = 1;
    }
  }

  onSubmitCliente() {
    this.clientService.triggerReloadClientes();
    if (this.formGroupCliente.invalid) {
      this._snackBar.open("Complete os campos.", "", {
        duration: 5000
      });
      this.toggle();
      return;
    }
    if(this.adress.length == 0){
      this._snackBar.open("Cadastre um endereço.", "", {
        duration: 5000
      });
      return;
    }
    const cpfRaw = this.formGroupCliente.get('cpf')?.value || '';
    const cpfValue = cpfRaw.replace(/\D/g, '');
    const cpfString = cpfValue;

    const birthDate = this.formGroupCliente.get('date')?.value;

    const clienteSend = new Clienteclass(
      cpfString,
      this.formGroupCliente.get('email')?.value,
      this.formGroupCliente.get('nome')?.value,
      this.formGroupCliente.get('telefone')?.value,
      this.formGroupCliente.get('date')?.value,
      this.adress
    );

    this.listaService.addCliente(clienteSend).pipe(
      tap(response => {
        this._snackBar.open("Cliente Salvo.", "", {
          duration: 5000
        });
      }),
      catchError(error => {
        this._snackBar.open("Erro ao salvar cliente!", "", {
          duration: 5000
        });
        return of(null);
      })
    ).subscribe();

    this.dialogRef.close(true);
  }


  formatCpf(event: Event) : string{
    const input = event.target as HTMLInputElement;
    let value = input.value;
    value = value.replace(/\D/g, '');

    if (value.length <= 3) input.value = value;
    else if (value.length <= 6) input.value = `${value.slice(0, 3)}.${value.slice(3)}`;
    else if (value.length <= 9) input.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    else input.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;

    this.formGroupCliente.get('cpf')?.setValue(input.value);
    return input.value;
  }

  onSubmit() {
    this.clientService.triggerReloadClientes();
    if (this.formGroup.valid) {
      this.adNew = new Adress(
        this.formGroup.get('tipo')?.value,
        this.formGroup.get('cep')?.value,
        this.formGroup.get('estado')?.value,
        this.formGroup.get('logradouro')?.value,
        this.formGroup.get('municipio')?.value,
        this.formGroup.get('bairro')?.value,
        this.formGroup.get('numero')?.value,
        this.formGroup.get('complemento')?.value
      );
      if(!this.searchAdress(this.adNew)){
        this.adress.push(this.adNew);
        this._snackBar.open("Endereço cadastrado", "", {
          duration: 5000
        });
      }else{
        this._snackBar.open("Erro, endereço já cadastrado.", "Ok");
      }
    }
  }

  searchAdress(address: Adress): boolean {
    return this.adress.some(a =>
      a.tipo === address.tipo &&
      a.cep === address.cep &&
      a.estado === address.estado &&
      a.logradouro === address.logradouro &&
      a.municipio === address.municipio &&
      a.bairro === address.bairro &&
      a.numero === address.numero &&
      a.complemento === address.complemento
    );
  }

  fetchAddress(cep: string) {
    this.cepService.searchCep(cep.replace(/\D/g, '')).subscribe(address => {
      if (address) {
        this.formGroup.patchValue({
          estado: address.uf,
          logradouro: address.logradouro,
          municipio: address.localidade,
          bairro: address.bairro
        }, { emitEvent: false });

        this.formGroup.get('estado')?.disable();
        this.formGroup.get('logradouro')?.disable();
        this.formGroup.get('municipio')?.disable();
        this.formGroup.get('bairro')?.disable();
      }
    });
  }

  formatCep(event: Event) : string{
    const input = event.target as HTMLInputElement;
    let value = input.value;
    if (value) {
      value = value.replace(/\D/g, '');
      if (value.length > 8) {
        value = value.slice(0, 8);
      }
      if (value.length <= 5) {
        this.formGroup.get('cep')?.setValue(value, { emitEvent: false });
      } else {
        this.formGroup.get('cep')?.setValue(`${value.slice(0, 5)}-${value.slice(5)}`, { emitEvent: false });
      }

      if(value.length == 8){
        this.fetchAddress(value);
      }
      if (value.length < 8) {
        this.clearFields();
      }
      value = this.formGroup.get('cep')?.value;
      return value;
    }
    return "";
  }

  formatTelefone(event: Event) : string {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    if (value) {
      value = value.replace(/\D/g, '');
      if (value.length <= 2) {
        this.formGroupCliente.get('telefone')?.setValue(`(${value}`, { emitEvent: false });
      } else if (value.length <= 7) {
        this.formGroupCliente.get('telefone')?.setValue(`(${value.slice(0, 2)}) ${value.slice(2)}`, { emitEvent: false });
      } else if (value.length <= 10) {
        this.formGroupCliente.get('telefone')?.setValue(`(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`, { emitEvent: false });
      } else {
        this.formGroupCliente.get('telefone')?.setValue(`(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`, { emitEvent: false });
      }
    }
    value = this.formGroupCliente.get('telefone')?.value;
    return value;
  }

  clearFields() {

    this.formGroup.get('estado')?.reset("", { emitEvent: false });
    this.formGroup.get('logradouro')?.reset("", { emitEvent: false });
    this.formGroup.get('municipio')?.reset("", { emitEvent: false });
    this.formGroup.get('bairro')?.reset("", { emitEvent: false });

    this.formGroup.get('estado')?.enable();
    this.formGroup.get('logradouro')?.enable();
    this.formGroup.get('municipio')?.enable();
    this.formGroup.get('bairro')?.enable();
  }

}

class FormatError implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10), 10)) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11), 10)) return false;

  return true;
}


export function cpfValidator(control: FormControl) {
  const cpf = control.value;

  if (!cpf || validarCPF(cpf)) {
    return null;
  }

  return { cpfInvalido: true };
}
