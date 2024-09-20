import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, Observable, of, Subscription } from 'rxjs';

import { ErroMessageComponent } from '../../share/components/erro-message/erro-message.component';
import { Cliente } from '../models/cliente';
import { ListaService } from '../services/lista.service';
import { Router } from '@angular/router';
import { Clienteclass } from '../models/clienteclass';
import { AdressViewComponent } from '../adress-view/adress-view.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AddClientComponent } from '../add-client/add-client.component';
import { UpdateService } from '../services/update.service';
import { EditClientComponent } from '../edit-client/edit-client.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['cpf', 'nome', 'email','telefone', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>();
  private reloadSubscription!: Subscription;

  constructor(private listaService: ListaService,
              public dialog: MatDialog,
              private router: Router, private breakpointObserver: BreakpointObserver,
              private clientService: UpdateService) { }

  ngOnInit() {
    this.loadClientes();
    this.breakpointObserver.observe([
      '(max-width: 600px)',
      '(max-width: 960px)',
      '(min-width: 961px)'
    ]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        if (state.breakpoints['(max-width: 600px)']) {
          this.displayedColumns = ['cpf', 'acoes'];
        } else if (state.breakpoints['(max-width: 960px)']) {
          this.displayedColumns = ['cpf', 'nome', 'email','acoes'];
        } else if (state.breakpoints['(min-width: 961px)']) {
          this.displayedColumns = ['cpf', 'nome', 'email', 'telefone','acoes'];
        }
      }
    });
    this.reloadSubscription = this.clientService.reloadClientes$.subscribe(() => {
      this.loadClientes();
    })
  }

  ngOnDestroy(){
    if (this.reloadSubscription) {
      this.reloadSubscription.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadClientes() {
    this.listaService.list().pipe(
      catchError(error => {
        this.whenError("Erro ao carregar clientes");
        return of([]);
      })
    ).subscribe(clientes => {

      this.dataSource.data = clientes;
      this.updateFilter();
    });
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60vw';
    dialogConfig.height = '60vh';
    const dialogRef = this.dialog.open(AddClientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.loadClientes();
      }
    });
  }

  onEditClient(cliente : Cliente) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60vw';
    dialogConfig.height = '60vh';
    dialogConfig.data = cliente;
    const dialogRef = this.dialog.open(EditClientComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.loadClientes();
      }
    });
  }

  showAdress(cliente: Cliente) {
    if (!this.dialog.openDialogs.length) {
      this.dialog.open(AdressViewComponent, { data: cliente, autoFocus: false, width : '60vw', height:'60vh'});
    }
  }

  whenError(error: string) {
    if (!this.dialog.openDialogs.length) {
      this.dialog.open(ErroMessageComponent, {
        data: error
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateFilter() {
    this.dataSource.filterPredicate = (data: Cliente, filter: string) => {
      const filters = filter.trim().toLowerCase().split(' ');
      return filters.every(term =>
        data.name.toLowerCase().includes(term) || data.cpf.toString().toLowerCase().includes(term)
      );
    };
  }

  deleteCliente(cliente: Cliente) {
    const clienteSend = new Clienteclass(
      cliente.cpf,
      cliente.email,
      cliente.name,
      "",
      "",
      []
    );

    this.listaService.removeCliente(clienteSend).pipe(
      catchError(error => {
        return of(null);
      })
    ).subscribe(response => {
      this.loadClientes(); // Recarregar a lista de clientes
    });
  }
}
