import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaRoutingModule } from './lista-routing.module';
import { ListaComponent } from './lista/lista.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { getPortuguesePaginatorIntl } from './models/paginatorin';
import { PipePipe } from './pipe/pipe.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ShareModule } from '../share/share.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { CepPipePipe } from './pipe/cep-pipe.pipe';
import { provideHttpClient } from '@angular/common/http';
import { AdressViewComponent } from './adress-view/adress-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddClientComponent } from './add-client/add-client.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TelefonePipe } from './pipe/telefone.pipe';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ListaServiceMockComponent } from './mocks/lista-service-mock/lista-service-mock.component';

@NgModule({
  declarations: [
    ListaComponent,
    PipePipe,
    CepPipePipe,
    AdressViewComponent,
    AddClientComponent,
    TelefonePipe,
    EditClientComponent,
    ListaServiceMockComponent,

  ],
  imports: [
    CommonModule,
    ListaRoutingModule,
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
    MatProgressSpinnerModule,
    ShareModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() } ,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    provideHttpClient()
  ],
})
export class ListaModule { }
