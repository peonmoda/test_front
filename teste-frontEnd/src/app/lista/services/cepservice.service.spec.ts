import { TestBed } from '@angular/core/testing';

import { CepserviceService } from './cepservice.service';
import { provideHttpClient } from '@angular/common/http';

describe('CepserviceService', () => {
  let service: CepserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
      ]
    });
    service = TestBed.inject(CepserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
