import { Adress } from "./adress";

export interface Cliente {
  cpf: number;
  email: string;
  name: string;
  telefone:string;
  endereco: Adress[];

}
