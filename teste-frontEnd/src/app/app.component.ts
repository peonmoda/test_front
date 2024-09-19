import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AddClientComponent } from './lista/add-client/add-client.component';
import { UpdateService } from './lista/services/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  title = 'teste-frontEnd';
  @ViewChild(MatSidenav, {static: true})
  sidenav!: MatSidenav;
  constructor(private observer: BreakpointObserver,
     public dialog: MatDialog,
     private clientService: UpdateService) { }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60vw';
    dialogConfig.height = '54vh';
    const dialogRef = this.dialog.open(AddClientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.triggerReloadClientes();
      }
    });
  }

  ngOnInit(): void {
    this.observer.observe(["(max-width: 800px)"]).subscribe((res) =>
    {
      if(res.matches){
        this.sidenav.mode = "over";
        this.sidenav.close();
      }else{
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    })
  }

}
