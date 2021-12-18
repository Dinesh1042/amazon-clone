import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseSplit',
})
export class CamelCaseSplitPipe implements PipeTransform {
  transform(value: string): string {
    return !value ? '' : value.replace(/([a-z](?=[A-Z]))/g, '$1 ');
  }
}
