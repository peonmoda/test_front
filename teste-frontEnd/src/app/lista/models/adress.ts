export class Adress {
  tipo: string;
  cep : string;
  estado: string;
  logradouro: string;
  municipio: string;
  bairro: string;
  numero: string;
  complemento: string;

  constructor(tipo :string, cep :string, estado:string, logradouro:string,municipio:string,
    bairro:string, numero:string,complemento:string){
      this.cep = cep;
      this.tipo = tipo;
      this.estado = estado;
      this.logradouro = logradouro;
      this.municipio = municipio;
      this.bairro = bairro;
      this.numero = numero;
      this.complemento = complemento;
  }
}
