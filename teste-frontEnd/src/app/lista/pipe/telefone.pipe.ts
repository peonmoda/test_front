import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {

  transform(value: string | null, ...args: unknown[]): string {
    if (!value) {
      return '';
    }

    // Remove caracteres não numéricos
    const cleaned = value.replace(/\D/g, '');

    // Verifica o comprimento do número
    if (cleaned.length <= 10) {
      return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else {
      return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
  }

}
