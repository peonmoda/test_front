import { Component, inject, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Adress } from '../models/adress';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clienteclass } from '../models/clienteclass';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListaService } from '../services/lista.service';
import { CepserviceService } from '../services/cepservice.service';
import { UpdateService } from '../services/update.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-adress-view',
  templateUrl: './adress-view.component.html',
  styleUrl: './adress-view.component.scss'
})
export class AdressViewComponent implements OnInit {

  @ViewChild('tabs') tabGroup!: MatTabGroup;
  adressEd!: Adress;
  clientecpf: string | null = null;
  displayedColumns = ['cep', 'estado', 'municipio', 'bairro', 'logradouro', 'numero', 'complemento', 'acoes'];
  dataSource = new MatTableDataSource<Adress>();
  matcher = new FormatError();
  formGroup: FormGroup;
  adress: Adress[] = [];

  cepFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d{5}-\d{3}$/)
  ]);

  private _snackBar = inject(MatSnackBar);

  cliente: Clienteclass = new Clienteclass(0, "", "", "", "", []);
  currentIndex = 0;
  editing: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Clienteclass, private breakpointObserver: BreakpointObserver, private fb: FormBuilder,
    private listaService: ListaService,
    private cepService: CepserviceService,) {

    this.dataSource.data = data.adress
    this.cliente = data;
    this.adress = data.adress;

    this.formGroup = this.fb.group({
      tipo: [''],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      estado: ['', Validators.required],
      logradouro: ['', Validators.required],
      municipio: ['', Validators.required],
      bairro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['']
    });
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      '(max-width: 600px)',
      '(max-width: 1200px)',
      '(max-width: 1400px)',
      '(min-width: 1401px)'
    ]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        if (state.breakpoints['(max-width: 600px)']) {
          this.displayedColumns = ['cep', 'acoes'];
        } else if (state.breakpoints['(max-width: 1200px)']) {
          this.displayedColumns = ['cep', 'estado', 'municipio', 'acoes'];
        } else if (state.breakpoints['(max-width: 1400px)']) {
          this.displayedColumns = ['cep', 'estado', 'municipio', 'bairro', 'logradouro', 'acoes'];
        } else if (state.breakpoints['(min-width: 1401px)']) {
          this.displayedColumns = ['cep', 'estado', 'municipio', 'bairro', 'logradouro', 'numero', 'complemento', 'acoes'];
        }
      }
    });
  }

  goToForm() {
    this.tabGroup.selectedIndex = 2;
  }

  goToList() {
    this.tabGroup.selectedIndex = 0;
    this.editing = false;
  }

  onTabChange() {
    if (this.tabGroup.selectedIndex == 0) {
      this.editing = false;
      this.formGroup.get('estado')?.reset("", { emitEvent: false });
      this.formGroup.get('logradouro')?.reset("", { emitEvent: false });
      this.formGroup.get('municipio')?.reset("", { emitEvent: false });
      this.formGroup.get('bairro')?.reset("", { emitEvent: false });
      this.formGroup.get('tipo')?.reset("", { emitEvent: false });
      this.formGroup.get('numero')?.reset("", { emitEvent: false });
      this.formGroup.get('cep')?.reset("", { emitEvent: false });
      this.formGroup.get('complemento')?.reset("", { emitEvent: false });
      this.formGroup.get('estado')?.enable();
      this.formGroup.get('logradouro')?.enable();
      this.formGroup.get('municipio')?.enable();
      this.formGroup.get('bairro')?.enable();
    }

  }

  saveEdit(adress : Adress){
    if(this.searchAdress(adress)) {
      this.displayMessage("Endereco ja cadastrado!");
      return;
    }
    this.removeAdress(this.adressEd);
    this.adress.push(adress);
    this.dataSource.data = this.adress;
    this.displayMessage("Endereco alterado");
  }

  saveNewAdress(adress :Adress){
    if(this.searchAdress(adress)) {
      this.displayMessage("Endereco ja cadastrado!");
      return;
    }
    this.adress.push(adress);
    this.dataSource.data = this.adress;
    this.displayMessage("Endereco salvo");
  }

  getAdressFromForm() : Adress{
    return new Adress(
      this.formGroup.get('tipo')?.value,
      this.formGroup.get('cep')?.value,
      this.formGroup.get('estado')?.value,
      this.formGroup.get('logradouro')?.value,
      this.formGroup.get('municipio')?.value,
      this.formGroup.get('bairro')?.value,
      this.formGroup.get('numero')?.value,
      this.formGroup.get('complemento')?.value
    );
  }

  displayMessage(m :string){
    this._snackBar.open(m, "", {
      duration: 5000
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      if(this.editing){
        this.saveEdit(this.getAdressFromForm());
      }else{
        this.saveNewAdress(this.getAdressFromForm());
      }
      this.goToList();
    }else{
      this.displayMessage('Verifique os campos');
    }
  }

  fetchAddress(cep: string) {
    this.cepService.searchCep(cep.replace(/\D/g, '')).subscribe(address => {
      if (address) {
        this.formGroup.patchValue({
          estado: address.uf,
          logradouro: address.logradouro,
          municipio: address.localidade,
          bairro: address.bairro
        }, { emitEvent: false });
        this.formGroup.get('estado')?.disable();
        this.formGroup.get('logradouro')?.disable();
        this.formGroup.get('municipio')?.disable();
        this.formGroup.get('bairro')?.disable();
      }
    });
  }

  clearFields() {

    this.formGroup.get('estado')?.reset("", { emitEvent: false });
    this.formGroup.get('logradouro')?.reset("", { emitEvent: false });
    this.formGroup.get('municipio')?.reset("", { emitEvent: false });
    this.formGroup.get('bairro')?.reset("", { emitEvent: false });

    this.formGroup.get('estado')?.enable();
    this.formGroup.get('logradouro')?.enable();
    this.formGroup.get('municipio')?.enable();
    this.formGroup.get('bairro')?.enable();
  }

  formatCep(event: Event) {
    let value = this.formGroup.get('cep')?.value;
    if (value) {
      value = value.replace(/\D/g, '');
      if (value.length <= 5) {
        this.formGroup.get('cep')?.setValue(value, { emitEvent: false });
      } else {
        this.formGroup.get('cep')?.setValue(`${value.slice(0, 5)}-${value.slice(5)}`, { emitEvent: false });
      }
      if (value.length == 8) {
        this.fetchAddress(value);
      }
      if (value.length < 8) {
        this.clearFields();
      }
    }
  }

  removeAdress (adress: Adress) {
    this.adress = this.adress.filter(a => a != adress);
    this.dataSource.data = this.adress;
  }

  searchAdress(address: Adress): boolean {
    return this.adress.some(a =>
      a.tipo === address.tipo &&
      a.cep === address.cep &&
      a.numero === address.numero &&
      a.complemento === address.complemento
    );
  }

  editAdress(adress: any) {
    this.adressEd = adress;
    this.formGroup.get('tipo')?.setValue(this.adressEd.tipo, { emitEvent: false });
    this.formGroup.get('cep')?.setValue(adress.cep, { emitEvent: false });
    this.formGroup.get('estado')?.setValue(adress.estado, { emitEvent: false });
    this.formGroup.get('logradouro')?.setValue(adress.logradouro, { emitEvent: false });
    this.formGroup.get('municipio')?.setValue(adress.municipio, { emitEvent: false });
    this.formGroup.get('bairro')?.setValue(adress.bairro, { emitEvent: false });
    this.formGroup.get('numero')?.setValue(adress.numero, { emitEvent: false });
    this.formGroup.get('complemento')?.setValue(adress.complemento, { emitEvent: false });
    this.editing = true;
    this.goToForm();
  }

  save() {
    this.cliente.adress = this.adress;
    this.listaService.alterarEndereco(this.cliente).pipe(
      tap(response => {
        this.displayMessage("Alterações salvas!");
      }),
      catchError(error => {
        this.displayMessage("Erro ao salvar alterações.");
        return of(null);
      })
    ).subscribe();
  }

}

class FormatError implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
