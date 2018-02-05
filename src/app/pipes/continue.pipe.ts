import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'continue'
})
export class ContinuePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    var str:string;
    if(value.length>=25)
    {
      str=value.slice(0,20)+'...'+value.slice(value.length-4,value.length)
    }

    return str;
  }

}
