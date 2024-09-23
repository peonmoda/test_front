import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone, Inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDatepicker, MatDatepickerToggle, MatDatepickerInput} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PessoaService } from '../../../services/pessoa.service';
import { CoreService } from '../../../core/core.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { AppComponent } from '../../../app.component';
import { AddressesModule } from '../addresses.module';
import { Router } from 'express';


@Component({
  selector: 'app-card',
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
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatRadioModule,
    ReactiveFormsModule

    
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  constructor(
    private activeRoute: ActivatedRoute
  ){
    this.activeRoute.params.subscribe(
      res => console.log(res)
    )
  }
}
