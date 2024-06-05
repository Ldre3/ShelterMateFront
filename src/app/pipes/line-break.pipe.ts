// line-break.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreak'
})
// Pipe que recibe un string y lo divide en chunks de un tamaño máximo

export class LineBreakPipe implements PipeTransform {
  transform(value: string, maxChars: number = 50): string {
    // Si no hay valor, devolver el valor original
    if (!value) return value;
    // Dividir el valor en chunks de tamaño maxChars
    const chunks = value.match(new RegExp(`.{1,${maxChars}}`, 'g'));
    // Devolver los chunks unidos por un salto de línea
    return chunks ? chunks.join('<br>') : value;
  }
}

