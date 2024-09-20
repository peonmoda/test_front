import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import {  MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';


import { MatNativeDateModule } from '@angular/material/core';
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
import { AddClientComponent } from './add-client.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('AddClientComponent', () => {
  let component: AddClientComponent;
  let fixture: ComponentFixture<AddClientComponent>;
  class mock {

  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddClientComponent],
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
        BrowserAnimationsModule,
      ],
      providers: [
        provideHttpClient(),
        { provide: MatDialogRef, useClass: mock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.adress = [{tipo:"Casa",cep:"12345678",estado:"PR",logradouro:"Rua", municipio:"Maringa", bairro:"Bairro", numero:"1", complemento:""}];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve formatar o cpf', () => {
    const mockEvent = {
      target: {
        value: '12345678900'
      }
    } as unknown as Event;
    const formattedCpf = component.formatCpf(mockEvent);
    expect(formattedCpf).toBe('123.456.789-00');
  });

  it('Deve formatar o cep', () => {
    const mockEvent = {
      target: {
        value: '12345678 '
      }
    } as unknown as Event;
    const formattedCep = component.formatCep(mockEvent);
    expect(formattedCep).toBe('12345-678');
  });

  it('Deve formatar o telefone', () => {
    const mockEvent = {
      target: {
        value: '44991563680'
      }
    } as unknown as Event;
    const formattedTelefone = component.formatTelefone(mockEvent);
    expect(formattedTelefone).toBe('(44) 99156-3680');
  });

  it('Deve verificar endereco ja cadastrado', () => {
    expect(component.searchAdress({tipo:"Casa",cep:"12345678",estado:"PR",logradouro:"Rua", municipio:"Maringa", bairro:"Bairro", numero:"1", complemento:""})).toBe(true);
  });

  it('Deve verificar endereco nao cadastrado', () => {
    expect(component.searchAdress({tipo:"Casa",cep:"111111",estado:"PR",logradouro:"Rua", municipio:"Maringa", bairro:"Bairro", numero:"1", complemento:""})).toBe(false);
  })




});
