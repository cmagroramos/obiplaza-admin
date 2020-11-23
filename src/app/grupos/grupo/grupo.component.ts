import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireDbService } from '../../fire-db.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { Grupos } from '../../models/grupos';
import { Platos } from '../../models/platos';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit, OnDestroy {

  grupo: Grupos = {
      $key: '',
      title: '',
      desc: '',
      thumb: '',
      icon: '',
      url: '',
      orden: 0,
      activo: false,
      generics: ''
  };
  responsiveOptions: any;
  id: string;
  platos: Platos[];
  cambiosOrdenListaPlatos = false;
  imagenes: string[] = [];
  formularioGrupo: FormGroup;
  porcentajeSubida = 0;
  cambios = false;
  grupo$: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              public db: FireDbService,
              private fb: FormBuilder,
              private router: Router,
              private storage: AngularFireStorage,
              private toastr: ToastrService) {
                this.responsiveOptions = [
                  {
                      breakpoint: '1024px',
                      numVisible: 3,
                      numScroll: 3
                  },
                  {
                      breakpoint: '768px',
                      numVisible: 2,
                      numScroll: 2
                  },
                  {
                      breakpoint: '560px',
                      numVisible: 1,
                      numScroll: 1
                  }
                ];
               }

    ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        // Obtener el grupo en cuestion
      this.db.getGrupo(this.id).then(
        grupo => {
          this.grupo = grupo;
          this.cargarPlatos();
          if (!grupo.hasOwnProperty('activo')) {
            this.grupo.activo = true;
          }
          if (!grupo.hasOwnProperty('orden')) {
            this.grupo.orden = 0;
          }
          this.iniciarFormulario();
          this.grupo$ = this.formularioGrupo.valueChanges.subscribe( () => this.cambios = true );
        }
      ).catch (error => console.log('error'));
      } else {
        this.inicializarFormulario();
      }
    });
  }

  ngOnDestroy() {
    if (this.grupo$) {
      this.grupo$.unsubscribe();
    }
  }

  iniciarFormulario() {
    this.formularioGrupo = this.fb.group({
      $key: this.id,
      guid: [''],
      featured: false,
      title: [this.grupo.title, Validators.required],
      desc: [this.grupo.desc],
      thumb: [this.grupo.thumb],
      icon: [''],
      url: [this.grupo.url],
      activo: [this.grupo.activo],
      orden: [this.grupo.orden],
      generics: [this.grupo.generics, Validators.required]
      // pictures: this.plato.pictures
    });

  }

  inicializarFormulario() {
    this.formularioGrupo = this.fb.group({
      $key: '',
      title: ['', Validators.required],
      desc: [''],
      featured: false,
      thumb: [''],
      url: [''],
      icon: [''],
      orden: [''],
      activo: [''],
      generics: ['', Validators.required]
      // pictures: this.plato.pictures
    });

  }

  guardar() {
    this.db.updateGrupo(this.formularioGrupo.value)
    .then( ok => {
      this.toastr.success('DedoClic!', 'Datos guardados!');
      this.formularioGrupo.setValue(this.grupo);
      this.cambios = false;
    }).catch( error => {
      this.toastr.error('DedoClic!', 'Sin papeles!');
      console.log('error', error);
    });
  }

  borrarGrupo() {
    this.db.removeGrupo(this.formularioGrupo.get('$key').value).then( ok => {
      this.toastr.success('DedoClic!', 'Datos Borrados!');
      this.router.navigate(['grupos']);

    }
    );

  }

  subirImagenLogo( evento) {
    if (evento.target.files.length > 0) {
      // const nombre = new Date().getTime().toString();
      const archivo = evento.target.files[0];
      const extension =  archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'));
      const ruta = 'grupos/' + this.id  + extension ;
      this.imagenes = [];
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(archivo);
      tarea.then( (objeto) => {
        referencia.getDownloadURL().subscribe((url) => {
          this.formularioGrupo.get('thumb').setValue(url);
          console.log(this.imagenes);
          this.formularioGrupo.get('url').setValue(url);
        });
      });
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentajeSubida = parseInt( porcentaje.toString() );
      });
    }
  }

  activar(plato: Platos) {
    plato.activo = !plato.activo;
    this.db.updateActivoPlato(plato).then(
      ok => {
        this.actualizaPlatoLocal(plato);
        this.toastr.success('DedoClic!', 'Plato actualizado!');
      }
    );
  }

  recomendar(plato: Platos) {
    plato.isFeatured = !plato.isFeatured;
    this.db.updateRecomendacionPlato(plato).then(
      ok => {
        this.actualizaPlatoLocal(plato);
        this.toastr.success('DedoClic!', 'Plato actualizado!');
      }
    );
  }

  venta(plato: Platos) {
    plato.compraOnline = !plato.compraOnline;
    this.db.updateOnlinePlato(plato).then(
      ok => {
        this.actualizaPlatoLocal(plato);
        this.toastr.success('DedoClic!', 'Plato actualizado!');
      }
    );
  }

  cargarPlatos() {
    this.db.getProductsByCategory(this.id).then(
      prods => {
        this.platos = prods;
        // Obtener solo los platos activos
        this.platos = this.platos.filter ( a => a.activo );
        this.platos.sort( (a, b) => ( a.orden - b.orden) );
      }
    );
  }

  actualizaPlatoLocal(plato: Platos) {

    let actualiza = this.platos.find( act => act.$key = plato.$key);
    actualiza = plato;
    console.log(this.platos);
  }

  cambioListaPlatos() {
    this.platos.forEach( (plate, index)  => {
      plate.orden = index;
    });
    this.cambiosOrdenListaPlatos = true;
  }

  guardarOrdenPlatos() {

    this.platos.forEach( (plate, index)  => {
      plate.orden = index;
      this.db.updateOrdenPlato(plate);
    });
    this.toastr.success('DedoClic!', 'Orden guardado!');
    this.cambiosOrdenListaPlatos = false;

  }

}
