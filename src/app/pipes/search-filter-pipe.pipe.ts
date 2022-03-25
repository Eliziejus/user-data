import {Pipe, PipeTransform} from '@angular/core';
import {Profile} from "../models/profile.model";

@Pipe({
  name: 'searchFilterPipe'
})
export class SearchFilterPipePipe implements PipeTransform {

    transform(profile: Profile[], searchValue: string): any {

    if (!profile || !searchValue) {
      return profile;
    }
    return profile.filter(profile =>
      profile.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      profile.surname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      profile.gender.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      profile.birthday.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      profile.phoneNumber.toString().includes(searchValue.toLocaleLowerCase()) ||
      profile.personalId.toString().includes(searchValue.toLocaleLowerCase())
    );
  }
}
//TODO Ask vytautas about that
