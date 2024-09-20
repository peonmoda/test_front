import { Clienteclass } from './clienteclass';

describe('Clienteclass', () => {
  it('should create an instance', () => {
    expect(new Clienteclass(12345678909,'emai','nome','telefone','data',[])).toBeTruthy();
  });
});
