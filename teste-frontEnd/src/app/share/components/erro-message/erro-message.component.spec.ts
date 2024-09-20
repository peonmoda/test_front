import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroMessageComponent } from './erro-message.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ErroMessageComponent', () => {
  let component: ErroMessageComponent;
  let fixture: ComponentFixture<ErroMessageComponent>;

  class MatDialogRefMock {
    close() {}
  }

  // Crie um mock para MatSnackBar se necessário
  class MatSnackBarMock {
    open() {
      return { onAction: () => of({}) };
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErroMessageComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatSnackBar, useClass: MatSnackBarMock },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ErroMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
