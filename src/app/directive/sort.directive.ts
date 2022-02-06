import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {Sort} from "../utils/sort";
import {SortEnum} from "../enums/sort-enum";

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort: Array<any>;


  constructor(private renderer: Renderer2, private targetElement: ElementRef) { }

  @HostListener("click")
  sortData() {

    const sort = new Sort();

    const elem = this.targetElement.nativeElement;

    const order = elem.getAttribute(SortEnum.DataOrder);

    const type = elem.getAttribute(SortEnum.DataType);

    const property = elem.getAttribute(SortEnum.DataName);

    if (order === "desc") {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute(SortEnum.DataOrder, SortEnum.Asc);
    } else {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute(SortEnum.DataOrder, SortEnum.Desc);
    }
  //TODO turi padaryti kad butu maziau eiluciu bet functionalus išliktu
  }

}
