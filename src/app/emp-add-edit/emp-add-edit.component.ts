import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PessoaService } from '../services/pessoa.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';
import { CoreService } from '../core/core.service';


@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    DatePipe,
    MatDatepicker,
  ],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empService: PessoaService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      nameForm: '',
      cpfForm: '',
      phoneForm: '',
      dobForm: '',
      emailForm: '',
      genderForm: '',
      address: this._fb.array([])
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
        .updatePessoa(this.data.id, this.empForm.value)
        .subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Cadastro Atualizado!')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      } else {
        this._empService
        .addPessoa(this.empForm.value)
        .subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Cadastro Realizado com Sucesso!')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      }
    }
  }

  onNoClick(): void {
    this.ngZone.run(() => {
      this._dialogRef.close();
    });
  }
}
