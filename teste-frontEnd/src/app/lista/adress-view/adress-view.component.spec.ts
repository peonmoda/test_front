import { ListaServiceMockComponent } from './../mocks/lista-service-mock/lista-service-mock.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { AdressViewComponent } from './adress-view.component';

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


// Mock dos outros serviços
class MockCepserviceService {
  // Adicione métodos mockados se necessário
}

class MockUpdateService {
  // Adicione métodos mockados se necessário
}
class MockMatDialog {
  // Adicione métodos mockados se necessário
}
class MockSnackBar {
  // Adicione métodos mockados se necessário
}

describe('AdressViewComponent', () => {
  let component: AdressViewComponent;
  let fixture: ComponentFixture<AdressViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdressViewComponent],
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
        { provide: MatSnackBar, useClass: MatSnackBar },
        { provide: ListaService, useClass: ListaServiceMockComponent },
        { provide: CepserviceService, useClass: MockCepserviceService },
        { provide: UpdateService, useClass: MockUpdateService },
        { provide: FormatError, useValue: new FormatError() },
        { provide: MatSnackBar, useClass: MockSnackBar },
        { provide: MatDialog, useClass: MockMatDialog },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useClass: MockMatDialog }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.adress = [{tipo:"Casa",cep:"12345678",estado:"PR",logradouro:"Rua", municipio:"Maringa", bairro:"Bairro", numero:"1", complemento:""}];
    component.formGroup.get('estado')?.setValue('pr');
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve encontrar endereco', () => {
    expect(component.searchAdress({tipo:"Casa",cep:"12345678",estado:"PR",logradouro:"Rua", municipio:"Maringa", bairro:"Bairro", numero:"1", complemento:""})).toBe(true);
  })

  it('nao deve encontrar endereco', () => {
    expect(component.searchAdress({tipo:"Casa",cep:"111111",estado:"PR",logradouro:"Rua", municipio:"Maringa", bairro:"Bairro", numero:"1", complemento:""})).toBe(false);
  })

  it('Nao deve remover o endereco', () => {
    component.removeAdress({tipo:"Casa",cep:"111111",estado:"PR",logradouro:"Rua", municipio:"Maringa", bairro:"Bairro", numero:"1", complemento:""});
    expect(component.adress.length).toBe(1);
  })

  it('Deve remover o endereco', () => {
    component.removeAdress({tipo:"Casa",cep:"12345678",estado:"PR",logradouro:"Rua", municipio:"Maringa", bairro:"Bairro", numero:"1", complemento:""});
    expect(component.adress.length).toBe(1);
  })

  it('Deve limpar  o formulario', () => {
    component.clearFields();
    expect(component.formGroup.get('estado')?.value).toBe('');
  })

  it('Deve adicionar endereco de edicao ao formulario', () => {
    component.editAdress({tipo:"Casa",cep:"12345678",estado:"PR",logradouro:"Rua", municipio:"Maringa", bairro:"Bairro", numero:"1", complemento:""});
    expect(component.formGroup.get('estado')?.value).toBe('PR');
  })

  it('Deve pegar os dados do formulario', () => {

    expect(component.getAdressFromForm().estado).toBe('pr');
  })


});

class FormatError implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
