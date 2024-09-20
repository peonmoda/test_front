import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaServiceMockComponent } from './../mocks/lista-service-mock/lista-service-mock.component';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

import { ListaService } from '../services/lista.service';
import { CepserviceService } from '../services/cepservice.service';
import { UpdateService } from '../services/update.service';
import { AddClientComponent } from '../add-client/add-client.component';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { ShareModule } from '../../share/share.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaComponent } from './lista.component';
import { provideHttpClient } from '@angular/common/http';

describe('ListaComponent', () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaComponent],
      imports: [
        CommonModule,
        MatTableModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatMenuModule,
        MatPaginator,
        ShareModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatTabsModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
