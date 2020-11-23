import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireDbService } from '../../fire-db.service';
import { Platos } from '../../models/platos';
import {  Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';

// import {Message} from 'primeng/api';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.scss']
})
export class PlatoComponent implements OnInit, OnDestroy {

  plato: Platos;
  id: string;
  imagenes: string[] = [];
  platos$: Subscription;
  cambios = false;
  nombre = 'Plato';

  public formularioPlato = this.fb.group({
    $key: [''],
    guid: [''],
    body: [''],
    category: ['', Validators.required],
    tags: [''],
    title: ['', Validators.required],
    alergenos: [''],
    thumb: [''],
    compraOnline: [''],
    orden: [0],
    ordenRecomendacion: [''],
    price: this.fb.array([
      this.fb.group({
        currency: [''],
        name: [''],
        value: [false]
      })
    ]),
    standardOptions: this.fb.array([
      this.fb.group({
        name: [''],
        selected: [false],
        value: ['']
      })
    ]),
    extraOptions: this.fb.array([
      this.fb.group({
        name: [''],
        value: [''],
        selected: [false]
      })
    ]),
    isFeatured: [''],
    pictures: [''],
    activo: [''],
    opcionesExcluyentes: [''],
    opcionesExtrasExcluyentes: ['']
  });

  porcentajeSubida = 0;

  constructor(private activatedRoute: ActivatedRoute,
              public db: FireDbService,
              private fb: FormBuilder,
              private router: Router,
              private storage: AngularFireStorage,
              private toastr: ToastrService ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
      // Obtener el plato en cuestion
      this.db.getPlato(this.id).then(
        plato => {
          this.plato = plato;
          this.nombre = plato.title;
          console.log(plato);
          if (!this.plato.alergenos) {
            this.plato.alergenos = [];
            console.log('Sin alergenos');
          }
          if (!this.plato.extraOptions) {
            this.plato.extraOptions = [];
            console.log('Sin extras');
          }
          if (!this.plato.standardOptions) {
            this.plato.standardOptions = [];
            console.log('Sin standars');
          }
          if (!this.plato.tags) {
            this.plato.tags = [];
            console.log('Sin tags');
          }
          if (!this.plato.orden) {
            this.plato.orden = 0;
            console.log('Sin tags');
          }
          if (!this.plato.ordenRecomendacion) {
            this.plato.ordenRecomendacion = 0;
            console.log('Sin orden recomendacion');
          }
          if (!this.plato.price) {
            this.plato.price = [];
            console.log('Sin precios');
          }
          if (!this.plato.opcionesExcluyentes) {
            this.plato.opcionesExcluyentes = false;
          }

          if (!this.plato.opcionesExtrasExcluyentes) {
            this.plato.opcionesExtrasExcluyentes = false;
          }

          if (!this.plato.compraOnline) {
            this.plato.compraOnline = false;
            console.log('Sin ventaOnline');
          }
          this.prices.clear();
          for(let i=0; i< plato.price.length; i++){
            this.addNewPriceToModel();
          }
          this.extraOptions.clear();
          for(let i = 0; i < plato.extraOptions.length; i++) {
            if (!this.plato.extraOptions[i].value) {
              this.plato.extraOptions[i].value = 0;
            }
            this.addNewextraToModel();
          }
          this.standardOptions.clear();
          for (let i = 0; i < plato.standardOptions.length; i++) {
            if (!this.plato.standardOptions[i].value) {
              this.plato.standardOptions[i].value = 0;
            }
            this.addNewstandarToModel();
          }
          this.formularioPlato.setValue(this.plato);

          this.platos$ = this.formularioPlato.valueChanges.subscribe( () => this.cambios = true);
        }
      ).catch (error => console.log('error', error));
      }
    });
  }

  ngOnDestroy() {
    if (this.platos$) {
      this.platos$.unsubscribe();
    }
  }


  guardar() {
    this.db.updatePlato(this.formularioPlato.value)
    .then( ok => {
      this.toastr.success('DedoClic!', 'Datos guardados!');
      this.cambios = false;
      this.router.navigate(['/plato/', ok]);
    }).catch( error => {
      this.toastr.error('DedoClic!', 'Sin papeles!');
    });
  }

  borrarPlato() {
    this.db.removePlato(this.formularioPlato.get('$key').value).then( ok => {
      this.toastr.success('DedoClic!', 'Datos Borrados!');
      this.router.navigate(['platos']);
    }
    );

  }

  borrarPrecio(index) {
    this.prices.removeAt(index);
  }

  borrarOpcionStandard(index) {
    this.standardOptions.removeAt(index);
  }

  borrarOpcionExtra(index) {
    this.extraOptions.removeAt(index);
  }

  subirImagenLogo( evento) {
    if (evento.target.files.length > 0) {
      // const nombre = new Date().getTime().toString();
      const archivo = evento.target.files[0];
      const extension =  archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'));
      const ruta = 'platos/' + this.id  + extension ;
      this.imagenes = [];
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(archivo);
      tarea.then( (objeto) => {
        referencia.getDownloadURL().subscribe((url) => {
          this.formularioPlato.get('thumb').setValue(url);
          this.imagenes[0] = url;
          console.log(this.imagenes);
          this.formularioPlato.get('pictures').setValue(this.imagenes);
        });
      });
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentajeSubida = parseInt( porcentaje.toString() );
      });
    }
  }

  get prices() {
      return this.formularioPlato.get('price') as FormArray;
  }

  addNewPriceToModel() {
    this.prices.push(
      this.fb.group({
        currency: ['€'],
        name: [''],
        value: ['']
      })
    );
  }

  get standardOptions() {
       return this.formularioPlato.get('standardOptions') as FormArray;
  }

  addNewstandarToModel() {
    this.standardOptions.push(
      this.fb.group({
        name: [''],
        selected: [''],
        value: [false]
      })
    );
  }

  get extraOptions() {
    return this.formularioPlato.get('extraOptions') as FormArray;
  }

  addNewextraToModel() {
    this.extraOptions.push(
      this.fb.group({
        name: [''],
        value: [''],
        selected: [false]
      })
    );
  }

  duplicarPlato() {
    this.db.duplicarPlato(this.formularioPlato.value)
    .then( ok => {
      this.toastr.success('DedoClic!', 'Plato Duplicado!');
      this.cambios = false;
      this.router.navigate(['/plato/', ok]);
    }).catch( error => {
      this.toastr.error('DedoClic!', 'Sin papeles!');
    });
  }


}
