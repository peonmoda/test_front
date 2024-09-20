import { ListaServiceMockComponent } from './../mocks/lista-service-mock/lista-service-mock.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { EditClientComponent } from './edit-client.component';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

// Crie um mock para MatDialogRef se necessário
class MatDialogRefMock {
  close() {}
}

// Crie um mock para MatSnackBar se necessário
class MatSnackBarMock {
  open() {
    return { onAction: () => of({}) };
  }
}

describe('EditClientComponent', () => {
  let component: EditClientComponent;
  let fixture: ComponentFixture<EditClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditClientComponent],
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
      ],   providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatSnackBar, useClass: MatSnackBarMock },
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
