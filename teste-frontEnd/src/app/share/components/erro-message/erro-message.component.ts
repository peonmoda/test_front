import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-erro-message',
  templateUrl: './erro-message.component.html',
  styleUrl: './erro-message.component.scss'
})
export class ErroMessageComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: string){

  }

  ngOnInit(): void {
  }

}
