import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErroMessageComponent } from './components/erro-message/erro-message.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { SucessesMessageComponent } from './sucesses-message/sucesses-message.component';

@NgModule({
  declarations: [
    ErroMessageComponent,
    SucessesMessageComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButton
  ],
  exports:[ErroMessageComponent]
})
export class ShareModule { }
