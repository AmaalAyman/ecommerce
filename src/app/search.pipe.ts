import { Pipe, PipeTransform } from '@angular/core';
import { Products } from './interfaces/products';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(product:Products[], term:string): Products[] {
    return product.filter((products)=>products.title.toLowerCase().includes(term.toLowerCase()));
  }

}
