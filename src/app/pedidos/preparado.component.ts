import { Component, OnInit, OnDestroy } from '@angular/core';
import { FireDbService } from '../fire-db.service';
import { Subscription } from 'rxjs';
import { Pedido, Detalle } from '../models/pedido';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preparado',
  templateUrl: './preparado.component.html',
  styleUrls: ['./preparado.component.css']
})
export class PreparadoComponent implements OnInit, OnDestroy {

  public  pedido$: Subscription;
  public pedidos: Pedido[];

  constructor(public db: FireDbService) { }

  ngOnInit() {

        this.pedido$ = this.db.getPedidosPendienteCobro()
        .pipe(
          map( (ped: Pedido[]) => ped)
        )
        .subscribe( ped => {
          this.pedidos = ped;
          this.pedidos = this.pedidos.map( (pedido: Pedido) => {
              return {
                total: this.totalAmount(pedido.pedido),
                ...pedido
              };
          });
        });
  }

  ngOnDestroy() {
    if (this.pedido$) {
      this.pedido$.unsubscribe();
    }
  }

  cerrarPedido(id: string) {

    Swal.fire({
      title: 'Pedido Terminado',
      text: 'Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, cancelar!',
      confirmButtonText: 'Si, está terminado!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Preparado!',
          'El pedido está preparado.',
          'success'
        );
        this.db.cobrarPedido(id).then( a => console.log('Pedido completado') );
      }
    });

  }

  getItemTotal(item) {
    let total = item.price * item.quantity;
    item.options.forEach(option => (total += option.value * item.quantity));
    return total;
  }

  totalAmount(pedido: Detalle[]): number {
    let total = 0;
    pedido.forEach(item => (total += this.getItemTotal(item)));
    return total;
  }

}
