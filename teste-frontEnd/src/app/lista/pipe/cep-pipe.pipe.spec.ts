import { CepPipePipe } from './cep-pipe.pipe';

describe('CepPipePipe', () => {
  it('create an instance', () => {
    const pipe = new CepPipePipe();
    expect(pipe).toBeTruthy();
  });
});

 it('Deve formatar o cep', () =>{
  const pipe = new CepPipePipe();
  expect(pipe.transform('12345678')).toBe('12345-678');
 });
