import { Component, Inject, inject } from '@angular/core';
import { Clienteclass } from '../models/clienteclass';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ListaService } from '../services/lista.service';
import { UpdateService } from '../services/update.service';
import { AddClientComponent } from '../add-client/add-client.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss'
})
export class EditClientComponent {

  formGroupCliente: FormGroup;
  dateFilter = (date: Date | null): boolean => {

    const today = new Date();
    return date ? date <= today : true;
  }
  matcher = new FormatError();
  currentIndex = 0;
  private _snackBar = inject(MatSnackBar);
  cpf : number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Clienteclass,
    private fb: FormBuilder,
     public dialog: MatDialog,
      private listaService: ListaService,
      private dialogRef: MatDialogRef<AddClientComponent>,
      private clientService: UpdateService) {

    this.formGroupCliente = this.fb.group({
      nome: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern('^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}\\-[0-9]{2}$')]],
      date: ['', Validators.required],
      telefone: ['']

    });
    this.formGroupCliente.get('nome')?.setValue(data.name);
    this.formGroupCliente.get('cpf')?.setValue(this.formatCpf(String(data.cpf)));
    this.formGroupCliente.get('email')?.setValue(data.email);
    this.formGroupCliente.get('telefone')?.setValue(data.telefone);
    this.formGroupCliente.get('date')?.setValue(data.birth);
    this.formGroupCliente.get('cpf')?.disable();
    this.cpf = data.cpf;
  }

  onSubmitCliente() {
    this.clientService.triggerReloadClientes();
    if (this.formGroupCliente.invalid) {
      return;
    }

    const clienteSend = new Clienteclass(
      this.cpf,
      this.formGroupCliente.get('email')?.value,
      this.formGroupCliente.get('nome')?.value,
      this.formGroupCliente.get('telefone')?.value,
      this.formGroupCliente.get('date')?.value,
      []
    );

    this.listaService.alterarCliente(clienteSend).pipe(
      tap(response => {
        this._snackBar.open("Cliente Salvo.", "", {
          duration: 5000
        });
      }),
      catchError(error => {
        this._snackBar.open("Erro ao alterar cliente!", "", {
          duration: 5000
        });
        return of(null);
      })
    ).subscribe();
    this.dialogRef.close(true);
  }


  formatCpf(cpf: string) : string{
    let value = cpf;
    value = value.replace(/\D/g, '');

    if (value.length <= 3) cpf = value;
    else if (value.length <= 6) cpf = `${value.slice(0, 3)}.${value.slice(3)}`;
    else if (value.length <= 9) cpf= `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    else cpf = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;

    return cpf;
  }


  formatTelefone(event: Event) {
    let value = this.formGroupCliente.get('telefone')?.value;
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
  }

}

class FormatError implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
