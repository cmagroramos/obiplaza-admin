import { Component, OnInit, ViewChild } from '@angular/core';
import { FireDbService } from '../fire-db.service';
import { Platos } from '../models/platos';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.css']
})
export class PlatosComponent implements OnInit {

  @ViewChild('searchBox') public searchBox: NgModel;
  platos: Platos[] = [];
  textoBusqueda: string;
  id: string;
  constructor(public db: FireDbService,
              private router: Router,
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      // console.log('Los params', params.id);
      if (!params.id) {
        this.db.getPlatos().then( platos => {
          this.platos = platos;
        });
      } else {
        this.id = params.id;
        // Obtener los platos de ese grupo
        this.db.getProductsByCategory(this.id).then(
          plato => {
            this.platos = plato;
            console.log('Grupo:' + this.id);
            console.log('Los platos de ese grupo:' + this.platos);
          }
        ).catch (error => console.log('error'));
      }
    });
  }

  verPlato(id: string) {
    this.router.navigate(['/plato/', id]);
  }

  valorBusqueda(valor) {
      console.log('Valor busaqeuda', valor);
      this.db.getPlatosByDesc(valor.toLowerCase()).then( platos => {
        this.platos = platos;
      });
  }

}
