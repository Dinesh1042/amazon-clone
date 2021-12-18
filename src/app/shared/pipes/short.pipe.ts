import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short',
})
export class ShortPipe implements PipeTransform {
  transform(value: string, length = 4, finalDot = false): string {
    const valueArr = value.split(' ');
    let text =
      valueArr.length <= 4 ? value : valueArr.slice(0, length).join(' ');

    text += finalDot && valueArr.length > length ? '...' : '';

    return text;
  }
}
