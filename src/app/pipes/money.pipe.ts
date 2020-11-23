import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  private currencyPipe: CurrencyPipe;

  constructor() {
    this.currencyPipe = new CurrencyPipe(environment.currency.locale);
  }

  transform(value: number): string {
    return this.currencyPipe.transform(value, environment.currency.code, environment.currency.display, '1.2-2');
  }

}
