import { Adress } from "./adress";
import { Cliente } from "./cliente";

export class Clienteclass{
  name: string;
  cpf: number;
  email: string;
  birth: string;
  telefone: string;
  adress: Adress[];


  constructor(
    cpf: number,
    email: string,
    name: string,
    telefone: string,
    birth:string,
    endereco: Adress[]
  ) {
    this.cpf = cpf;
    this.email = email;
    this.name = name;
    this.telefone = telefone;
    this.adress = endereco;
    this.birth = birth;
  }
}
