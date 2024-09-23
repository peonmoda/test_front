import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PessoaService } from './services/pessoa.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CoreService } from './core/core.service';
import { CardComponent } from './pages/addresses/card/card.component'
import { nextTick } from 'process';
import { AddressAddEditComponent } from './address-add-edit/address-add-edit.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    DatePipe,
    MatSnackBarModule,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'cpfForm',
    'nameForm',
    'dobForm',
    'emailForm',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: PessoaService,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getPessoaList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPessoaList();
        }
      }
    })
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

  openAddEditAddressForm(){
    const dialogRef = this._dialog.open(CardComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getPessoaList();
        }
      }
    })
  }

  openEditAddressForm(data: any) {
    const dialogRef = this._dialog.open(CardComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPessoaList();
        }
      }
    })
  }

  addressTable(id: number, data: any) {
    this._empService.getPessoaInfo(id,data).subscribe({
      next: (res) => {
        this._coreService.openSnackBar(`
          Olá ${data.nameForm}!\n
          E-mail: ${data.emailForm}
          `, 'done');
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

  deletePessoa(id: number) {
    this._empService.deletePessoa(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Cadastro Apagado com Sucesso!', 'done')
        this.getPessoaList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPessoaList();
        }
      }
    })
  }

  openAddressForm(data: any){
    let dialogRef = this._dialog.open(AddressAddEditComponent, {
      width: '80%',
      height: '80%',
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPessoaList();
        }
      }
    })
  }
}
