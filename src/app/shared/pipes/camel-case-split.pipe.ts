import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseSplit',
})
export class CamelCaseSplitPipe implements PipeTransform {
  transform(value: string): string {
    return !value
      ? ''
      : value
          .replace(/([a-z](?=[A-Z]))/g, '$1 ')
          .split(' ')
          .map(this.capitalize)
          .join(' ');
  }

  private capitalize(word: string) {
    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
  }
}
