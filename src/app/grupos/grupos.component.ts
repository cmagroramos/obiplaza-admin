import { Component, OnInit } from '@angular/core';
import { FireDbService } from '../fire-db.service';
import { Grupos } from '../models/grupos';
import { Router } from '@angular/router';
import { IOption } from 'ng-select';
// import {  FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  grupos: Grupos[] = [];
  entries: IOption[] = [];
  // formularioGrupos = this.fb.group({
  //   grupos: this.fb.array([
  //     this.fb.group({
  //       $key: [''],
  //       orden: [''],
  //       activo: ['']
  //     })
  //   ])
  //   });

  constructor(public db: FireDbService, private router: Router ) { }

  ngOnInit() {

    this.db.getGrupos().then( grupos => {
      this.grupos = grupos;
      // console.log(this.grupos);
      // for(let i=0; i< this.grupos.length; i++){
      //   this.addNewGroupToModel(this.grupos[i]);
      // }
    });
    this.db.getGenericsSelect().then( entries => {
      this.entries = entries;
      // console.log(this.entries);
    });


  }

  verGrupo(id: string) {
    this.router.navigate(['/grupo/', id]);
  }

  verProductosGrupo(id: string) {
    this.router.navigate(['/platos/', id]);
  }

  onSelectionChange(entry) {
    // for (let i = 0; i < this.grupos.length; i++) {
    //   this.deleteGroupToModel(i);
    //   console.log('Borrar:', i);
    // }
    this.db.getGruposByGenerics(entry.value).then( grupos => {
      this.grupos = grupos;
      console.log(this.grupos);
      // for(let i=0; i< this.grupos.length; i++){
      //   this.addNewGroupToModel(this.grupos[i]);
      //   console.log('Añadir:', this.grupos[i].desc);
      // }
    });
  }

  // actualiza(order, valor){
  //   console.log(order, valor);
  // }

  // get grupo() {
  //   return this.formularioGrupos.get('grupos') as FormArray;
  // } 

  // addNewGroupToModel(grupo: Grupos) {
  //   this.grupo.push(
  //     this.fb.group({
  //       $key: [grupo.$key],
  //       orden: [grupo.orden],
  //       activo: [grupo.activo]
  //     })
  //   );
  // }
  // deleteGroupToModel(i: number) {
  //   this.grupo.removeAt(i);
  // }

}
