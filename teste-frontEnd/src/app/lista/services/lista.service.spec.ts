import { TestBed } from '@angular/core/testing';

import { ListaService } from './lista.service';
import { provideHttpClient } from '@angular/common/http';

describe('ListaService', () => {
  let service: ListaService;

  beforeEach(() => {
    TestBed.configureTestingModule({      providers: [
      provideHttpClient()]});
    service = TestBed.inject(ListaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
