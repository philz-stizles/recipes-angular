import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filter: string, key: string) {
    if (value.length < 1) {
      return value;
    }

    return value.filter((item) => {
      return item[key] === filter;
    });
  }
}
