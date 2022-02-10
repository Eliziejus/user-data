import {SortEnum} from "../enums/sort-enum";

export class Sort {

  private sortOrder = 1;
  private collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  })

  constructor() {
  }

  public startSort(property: number, order: string, type = "") {
    if (order === SortEnum.Desc) {
      this.sortOrder = -1;
    }
    return (a: string, b: string) => {
      if (type === SortEnum.Date) {
        return this.sortData(new Date(a[property]), new Date(b[property]));
      } else {
        return this.collator.compare(a[property], b[property]) * this.sortOrder;
      }
    }
  }
 //TODO analize this code because IT need this!!!!! DONT COPY FROM INTERNET IF YOU DONT KNOW koda rasyti pats :)
  private sortData(a: any, b: any): number {
    if (a < b) {
      return -1 * this.sortOrder;
    } else if (a > b) {
      return 1 * this.sortOrder;
    } else {
      return 0 * this.sortOrder;
    }
  }
}
