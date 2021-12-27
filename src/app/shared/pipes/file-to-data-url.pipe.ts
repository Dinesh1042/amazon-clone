import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

@Pipe({
  name: 'fileToDataUrl',
})
export class FileToDataUrlPipe implements PipeTransform {
  transform(value: File | string): Observable<string> {
    return new Observable((observer) => {
      if (!value) observer.error(`Cannot read the property of ${value}`);
      if (typeof value === 'string') observer.next(value);
      else {
        const fileReader = new FileReader();

        fileReader.addEventListener('load', () =>
          typeof fileReader.result === 'string'
            ? observer.next(fileReader.result)
            : observer.error('Invalid File')
        );

        fileReader.readAsDataURL(value);
      }
    });
  }
}
