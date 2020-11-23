import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireDbService } from 'src/app/fire-db.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { Generics } from '../../models/generics';
import { Grupos } from '../../models/grupos';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit, OnDestroy {

  id: string;
  carta: Generics;
  grupos: Grupos[];
  disponibles: Grupos[];
  carta$: Subscription;
  cambios = false;
  cambiosListaGrupos = false;
  public formularioGenerics = this.fb.group({
    $key: [''],
    guid: [''],
    icon: [''],
    boton: [''],
    mostrar: [''],
    title: ['', Validators.required],
    url: [''],
    grupo: [''],
    otros: []
  });

  // formularioGrupos = this.fb.group({
  //   grupos: this.fb.array([
  //     this.fb.group({
  //       $key: [''],
  //       nombre: [''],
  //       orden: [''],
  //       activo: ['']
  //     })
  //   ])
  //   });

  constructor(
    private activatedRoute: ActivatedRoute,
    public db: FireDbService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
      // Obtener el plato en cuestion
      this.db.getGenericById(this.id).then(
        generics => {
          this.carta = generics[0];
          if (!generics[0].hasOwnProperty('boton')) {
              this.carta.boton = false;
              console.log('No tiene boton');
          }
          if (!generics[0].hasOwnProperty('otros')) {
            this.carta.otros = false;
            console.log('No tiene otros');
          }
          // console.log(this.carta);
          this.db.getGruposByGenerics(this.id).then(
            grp => {
              this.grupos = grp;
              this.grupos.sort( (a , b) => a.orden - b.orden )
            }
          );
          // Todos los disponibles
          this.db.getNoGruposByGenerics(this.id).then(
            grp => {
              this.disponibles = grp;
            }
          );
          this.formularioGenerics.setValue(this.carta);
          this.carta$ = this.formularioGenerics.valueChanges.subscribe( () => this.cambios = true );
        }
      ).catch (error => console.log('error', error));
      }
  });
  }

  ngOnDestroy() {
    if (this.carta$) {
      this.carta$.unsubscribe();
    }
  }

  guardar() {
    this.db.updateGenerics(this.formularioGenerics.value)
    .then( ok => {
      this.toastr.success('DedoClic!', 'Datos guardados!');
      this.cambios = false;
    }).catch( error => {
      this.toastr.error('DedoClic!', 'Sin papeles!');
    });
  }

  guardarGrupos() {
    this.grupos.forEach( (grp, index)  => {
      this.cambiosListaGrupos = false;
      // Le asignamos la carta que estamos tratando
      grp.generics = this.id;
      this.db.updateGrupo(grp);
    });
    // Comprobar si queda alguno que hayamos pasado a los disponibles
    this.disponibles.forEach( grp => {
      if (grp.generics === this.id ) {
       grp.generics = '';
       console.log('Alguno ahi', grp.title);
       this.db.updateGrupo(grp);
      }
    });
    this.toastr.success('DedoClic!', 'Datos guardados!');

  }

  cambioListaGrupos(event) {
    console.log('Esto:', event);
    this.grupos.forEach( (grp, index)  => {
      grp.orden = index;
    });
    this.cambiosListaGrupos = true;
  }

}
