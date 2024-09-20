import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sucesses-message',
  templateUrl: './sucesses-message.component.html',
  styleUrl: './sucesses-message.component.scss'
})
export class SucessesMessageComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string){

  }
}
