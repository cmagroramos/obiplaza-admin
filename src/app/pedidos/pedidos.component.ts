import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from '../models/pedido';
import { FireDbService } from '../fire-db.service';
import Swal from 'sweetalert2';
import { CorreoService } from '../services/correo.service';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit, OnDestroy {

  public  pedido$: Subscription;
  public pedidos: Pedido[];

  constructor(public db: FireDbService, private correoService: CorreoService) { }

  ngOnInit() {

        this.pedido$ = this.db.getPedidosPendienteCocina()
        .pipe(
          map( (ped: Pedido[]) => ped)
        ).subscribe( ped => {
          this.pedidos = ped;
          this.pedidos.sort( (a, b) => b.fecha.valueOf() - a.fecha.valueOf() );
         });
  }

  ngOnDestroy() {
    if (this.pedido$) {
      this.pedido$.unsubscribe();
    }

  }

  cerrarPedido(pedido: Pedido) {

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
        this.db.servirPedido(pedido.$key)
        .then( a => {
          console.log('Pedido cerrado');
          this.correoService.crearAvisoEmail(pedido).subscribe(
            env => {
              console.log('Correo enviado', env);
            });

        } )
        .catch( a => console.log('Papeles cero!')  )
    ;
      }
    });
  }

  borrarPedido(pedido: Pedido) {
    Swal.fire({
      title: 'Borrar pedido',
      text: 'Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, cancelar!',
      confirmButtonText: 'Si, quiero borrarlo!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Pedido Borrado!',
          'success'
        );
        this.db.borrarPedido(pedido.$key)
        .then( a => {
          console.log('Pedido borrado');
        } )
        .catch( a => console.log('Papeles cero!')  )
    ;
      }
    });

  }

}
