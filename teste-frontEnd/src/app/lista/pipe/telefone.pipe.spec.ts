import { TelefonePipe } from './telefone.pipe';

describe('TelefonePipe', () => {
  it('create an instance', () => {
    const pipe = new TelefonePipe();
    expect(pipe).toBeTruthy();
  });
});

it('Deve formatar o telefone', () =>{
  const pipe = new TelefonePipe();
  expect(pipe.transform('44991563680 ')).toBe("(44) 99156-3680");
});
