import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'getDate',
})
export class GetDataPipe implements PipeTransform {
  public transform(value: string): any {
    const today = new Date(); //set today date
    const birth = new Date(value); //set selected date from form
    const age = today.getFullYear() - birth.getFullYear(); // calculate age
    return age;
  }
}
