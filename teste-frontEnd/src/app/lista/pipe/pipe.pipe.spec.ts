import { PipePipe } from './pipe.pipe';

describe('PipePipe', () => {
  it('create an instance', () => {
    const pipe = new PipePipe();
    expect(pipe).toBeTruthy();
  });
});

 it('should format cpf', () => {
  const pipe = new PipePipe();
  expect(pipe.transform('12345678909 ')).toBe('123.456.789-09');
 });
