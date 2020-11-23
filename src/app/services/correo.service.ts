import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';
import { MoneyPipe } from '../pipes/money.pipe';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  private  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private moneyPipe: MoneyPipe) { }


  crearAvisoEmail(pedido: Pedido): Observable<any> {
    const mensaje = {
      email: pedido.cliente.email,
      content: this.cuerpoCorreo(pedido),
      subject: 'Pedido preparado.' +  pedido.tipo
    };
    return this.http.post('https://dedoclicback.herokuapp.com/correo', mensaje, {headers: this.headers});
  }

  cuerpoCorreo(pedido: Pedido): string {
    let confirmation = '<b>Pedido preparado:</b><br/>';

    confirmation += 'Nombre: ' + pedido.cliente.firstName + '<br/>';

    if (pedido.cliente.email) {
      confirmation += 'Email: ' + pedido.cliente.email + '<br/>';
    }

    if (pedido.cliente.phoneNumber) {
      confirmation += 'Teléfono: ' + pedido.cliente.phoneNumber + '<br/><br/>';
    }

    confirmation += '<br/>';
    confirmation += '<b>Artículos:</b>';
    confirmation += '<br/>';

    confirmation += this.formatItemsList(pedido.pedido);
    // console.log('Correo', confirmation);
    return confirmation;

  }

  formatItemsList(cart) {
    let order = '';
    let total = 0;
    let currency = '€';
    cart.forEach(item => {
      let itemTotal = item.price * item.quantity;
      currency = item.currency;
      order += item.name + ' ' + item.quantity + 'x ' + item.size + ' ' + this.formatAmount(item.price) + '<br/>';

      if (item.options && item.options.length) {
        order += 'Optiones:<br/>';
        item.options.forEach(option => {
          order += '- ' + option.name + ' ' + this.formatAmount(option.value) + '<br/>';
          itemTotal += option.value * item.quantity;
        });
      }
      order += '<b>Total artículo:</b> ' + this.formatAmount(itemTotal) + '<br/>';
      total += itemTotal;
    });

    order += '<br/>';
    order += 'Total: ' + this.formatAmount(total);
    return order;
  }

  private formatAmount(amount) {
    return this.moneyPipe.transform(amount);
  }
}
