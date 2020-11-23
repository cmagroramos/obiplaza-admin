import { Component, OnDestroy, OnInit } from '@angular/core';
import { FireDbService } from '../fire-db.service';
import { Local } from '../models/local';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Platos } from '../models/platos';
import { Opciones } from '../models/pedido';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {


  public datos: Local;
  public recomendaciones: Platos[];
  public pobs: Opciones[] = [];
  cambiosOrdenListaRecomendaciones = false;
  home$: Subscription;
  cambios = false;
  porcentajeSubida = 0;
  imagenes: string[] = [];
  formularioCliente = this.fb.group({
    $key: [''],
    guid: [''],
    address: ['', Validators.required],
    desc: ['', Validators.required],
    urlRedir: ['', Validators.required],
    email: ['', Validators.compose([
      Validators.required, Validators.email
    ])],
    loteria: this.fb.group({
      activo: [''],
      numero: [''],
      precio: ['']
    }),
    pedidos: this.fb.array([
      this.fb.group({
        activo: [''],
        titulo: [''],
        subtitulo: [''],
        icon: [''],
        url: [''],
        pedidoMinimo: [''],
        gastosEnvio: [''],
        envioGratis: ['']

      })
    ]),
    horario: this.fb.array([
      this.fb.group({
        dia: [''],
        abierto: [''],
        desdeManana: [''],
        hastaManana: [''],
        desdeTarde: [''],
        hastaTarde: ['']
      })
    ]),
    horarioEntregas: this.fb.array([
      this.fb.group({
        dia: [''],
        abierto: [''],
        desdeManana: [''],
        hastaManana: [''],
        desdeTarde: [''],
        hastaTarde: ['']
      })
    ]),
    facebookPage: [''],
    instagramPage: [''],
    twitterPage: [''],
    pinterestPage: [''],
    logo: [''],
    map: [''],
    phoneNumber: ['', Validators.required],
    officeLocation: ['', Validators.required],
    storeName: ['', Validators.required],
    welcomeImages: [''],
    welcomeButtonText: [''],
    parametroCorreo: ['']
  });


  constructor(public db: FireDbService, private fb: FormBuilder, private storage: AngularFireStorage, private toastr: ToastrService ) {
   }

  ngOnInit() {

    this.db.getBusiness().then(
        datos => {
          this.datos = datos;
          // console.log(this.datos);
          this.horario.clear();
          for(let i=0; i< datos.horario.length; i++){
            this.addNewHorarioToModel();
          }
          this.pedidos.clear();
          for(let i=0; i< datos.pedidos.length; i++){
            this.addNewPedidoToModel();
          }
          this.horarioEntregas.clear();
          for(let i=0; i< datos.horarioEntregas.length; i++){
            this.addNewHorarioEntregaToModel();
          }
          this.datos.map = '';
          this.formularioCliente.setValue(this.datos);
          this.home$ = this.formularioCliente.valueChanges.subscribe( () => this.cambios = true );
        }
    );
    this.loadFeatured();
    this.cargaPoblaciones();

  }

  ngOnDestroy() {
    if (this.home$) {
      this.home$.unsubscribe();
    }
  }

  cargaPoblaciones() {
    this.pobs = [];
    this.db.getPoblaciones().then(pob => {
      pob.forEach(a => {
        this.pobs.push({ key: a.key, label: a.label });
      });
      console.log('pobs', this.pobs);
    });
  }

  guardar() {
    this.db.updateBusiness(this.formularioCliente.value)
    .then( ok => {
      this.toastr.success('DedoClic!', 'Datos guardados!');
      this.cambios = false;
    }).catch( error => {
      this.toastr.error('DedoClic!', 'Sin papeles!');
    });
  }

  subirImagenLogo( evento) {
    if (evento.target.files.length > 0) {
      // const nombre = new Date().getTime().toString();
      const archivo = evento.target.files[0];
      const extension =  archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'));
      const ruta = 'local/' + 'logo'  + extension ;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(archivo);
      tarea.then( (objeto) => {
        referencia.getDownloadURL().subscribe((url) => {
          this.formularioCliente.get('logo').setValue(url);
        });
      });
      tarea.percentageChanges().subscribe((porcentaje)=>{
        this.porcentajeSubida = parseInt( porcentaje.toString());
      });
    }
  }

  subirImagen( evento) {
    if (evento.target.files.length > 0) {
      // const nombre = new Date().getTime().toString();
      const archivo = evento.target.files[0];
      const extension =  archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'));
      const ruta = 'local/' + 'welcome'  + extension ;
      const referencia = this.storage.ref(ruta);
      this.imagenes = [];
      const tarea = referencia.put(archivo);
      tarea.then( (objeto) => {
        referencia.getDownloadURL().subscribe((url) => {
          this.imagenes[0] = url;
          this.formularioCliente.get('welcomeImages').setValue(this.imagenes);
        });
      });
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentajeSubida = parseInt( porcentaje.toString());
      });
    }
  }

  get horario() {
    return this.formularioCliente.get('horario') as FormArray;
  }

  get pedidos() {
    return this.formularioCliente.get('pedidos') as FormArray;
  }

  get horarioEntregas() {
    return this.formularioCliente.get('horarioEntregas') as FormArray;
  }

  addNewHorarioToModel() {
    this.horario.push(
      this.fb.group({
        dia: [''],
        abierto: [''],
        desdeManana: [''],
        hastaManana: [''],
        desdeTarde: [''],
        hastaTarde: ['']
      })
    );

  }

  addNewHorarioEntregaToModel() {
    this.horarioEntregas.push(
      this.fb.group({
        dia: [''],
        abierto: [''],
        desdeManana: [''],
        hastaManana: [''],
        desdeTarde: [''],
        hastaTarde: ['']
      })
    );

  }

  addNewPedidoToModel() {
    this.pedidos.push(
      this.fb.group({
        activo: [''],
        titulo: [''],
        subtitulo: [''],
        icon: [''],
        url: [''],
        pedidoMinimo: [''],
        gastosEnvio: [''],
        envioGratis: ['']
      })
    );

  }

  private loadFeatured() {
    this.db.getFeaturedProducts().then(products => {
      this.recomendaciones = products;
      // console.log(this.recomendaciones);
    });
  }

  cambioListaRecomendaciones() {
    this.recomendaciones.forEach( (plate, index)  => {
      plate.ordenRecomendacion = index;
    });
    this.cambiosOrdenListaRecomendaciones = true;
  }

  guardarOrdenRecomendaciones() {

    this.recomendaciones.forEach( (plate, index)  => {
      plate.ordenRecomendacion = index;
      this.db.updateOrdenPlatoRecomendacion(plate);
    });
    this.toastr.success('DedoClic!', 'Orden guardado!');
    this.cambiosOrdenListaRecomendaciones = false;

  }

}
