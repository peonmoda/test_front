import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessesMessageComponent } from './sucesses-message.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('SucessesMessageComponent', () => {
  let component: SucessesMessageComponent;
  let fixture: ComponentFixture<SucessesMessageComponent>;

  class MatDialogRefMock {
    // Adicione métodos mockados se necessário
  }
  class MatSnackBarMock {
    // Adicione métodos mockados se necessário
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SucessesMessageComponent],
            imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatSnackBar, useClass: MatSnackBarMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucessesMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
