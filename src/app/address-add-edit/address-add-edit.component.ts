import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { AppComponent } from '../app.component';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PessoaService } from '../services/pessoa.service';
import { CoreService } from '../core/core.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-address-add-edit',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    AppComponent,
    EmpAddEditComponent,
    MatIcon,
    MatPaginator,
    MatDatepicker,
    DatePipe,
    MatInput,
    MatTableModule,
    MatButton,
    MatSort,

  ],
  templateUrl: './address-add-edit.component.html',
  styleUrl: './address-add-edit.component.scss'
})
export class AddressAddEditComponent implements OnInit {
  displayedColumns: string[] = [
    'tipoEndForm',
    'cepForm',
    'logradouroForm',
    'numeroForm',
    'bairroForm',
    'municipioForm',
    'action'

  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getPessoaList();
  }

  constructor(
    private _dialog: MatDialog,
    private _empService: PessoaService,
    private _coreService: CoreService
  ) { 

  }

  getPessoaList() {
    this._empService.getPessoaList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addAddressForm(){
    console.log('Funcionando!')
  }
}
