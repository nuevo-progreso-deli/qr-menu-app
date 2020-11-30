import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutExtension'
})
export class CutExtensionPipe implements PipeTransform {

  transform(value: string): string {
    
     return value.split('.')[0];
  }

}
