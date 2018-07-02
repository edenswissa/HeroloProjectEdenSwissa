import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
  name: 'nosymbol'
})
export class NoSymbolPipe implements PipeTransform {
  transform(value: string) {
    return value.replace(/[^A-Z\d\sא-ת\d\s]/gi, '');
  }
}
