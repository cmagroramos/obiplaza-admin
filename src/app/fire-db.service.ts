import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, tap, take } from 'rxjs/operators';
import { Local } from './models/local';
import { Platos } from './models/platos';
import { IOption } from 'ng-select';
import { Grupos } from './models/grupos';
import { Generics } from './models/generics';
import { getUniqueId } from './uid';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pedido, Opciones } from './models/pedido';
import { convertTimestamp } from 'convert-firebase-timestamp';
import { SelectItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class FireDbService {

  constructor(private db: AngularFireDatabase, private fs: AngularFirestore) { }


  getPedidosPendienteCocina(): Observable<any> {
    // return this.fs.collection('pedidos').valueChanges();
    const pedRef = this.fs.collection('pedidos', ref => ref.where('preparado', '==', false));

    return pedRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Pedido;
          data.$key = a.payload.doc.id;
          data.fecha = convertTimestamp(data.fecha);
          return data;
        });
      })
    );
  }

  getPedidosPendienteCobro(): Observable<any> {
    // return this.fs.collection('pedidos').valueChanges();
    const pedRef = this.fs.collection('pedidos', ref => ref.where('preparado', '==', true).where('cobrado', '==', false));

    return pedRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Pedido;
          data.$key = a.payload.doc.id;
          data.fecha = convertTimestamp(data.fecha);
          return data;
        });
      })
    );
  }

  servirPedido( id: string): Promise<any> {
    return this.fs.collection('pedidos').doc(id).update(
      {preparado: true}
    );
  }

  borrarPedido( id: string): Promise<any> {
    return this.fs.collection('pedidos').doc(id).delete();
  }

  cobrarPedido( id: string): Promise<any> {
    console.log(id);
    return this.fs.collection('pedidos').doc(id).update(
      {cobrado: true}
  );
  }

  updateUserData(user: any) {
    console.log('user: ', user);
    const path = 'users/' + user.uid;
    const u = {
      email: user.email,
      nombre: user.displayName
    };
    this.db.object(path).update(u)
    .catch(error => console.log(error));
  }

  updatePlato(platoUpdate: Platos): Promise<any> {

    const path = 'platos/' + platoUpdate.$key;
    const plato = {
      body: platoUpdate.body,
      title: platoUpdate.title,
      category: platoUpdate.category,
      alergenos: platoUpdate.alergenos,
      thumb: platoUpdate.thumb,
      pictures: platoUpdate.pictures,
      price: platoUpdate.price,
      isFeatured: platoUpdate.isFeatured,
      tags: platoUpdate.tags ,
      activo: platoUpdate.activo,
      orden: platoUpdate.orden,
      ordenRecomendacion: platoUpdate.ordenRecomendacion,
      compraOnline: platoUpdate.compraOnline,
      standardOptions: platoUpdate.standardOptions,
      opcionesExcluyentes: platoUpdate.opcionesExcluyentes,
      opcionesExtrasExcluyentes: platoUpdate.opcionesExtrasExcluyentes,
      extraOptions: platoUpdate.extraOptions
    };

    if (platoUpdate.$key !== '') {
      this.db.object(path).update(plato);
      return Promise.resolve(platoUpdate.$key);
    } else {
      const id = getUniqueId(4);
      this.db.object(path + id).set(plato);
      return Promise.resolve(id);
      }
  }

   duplicarPlato(platoUpdate: Platos): Promise<any> {

    const path = 'platos/';
    const plato = {
      body: platoUpdate.body,
      title: platoUpdate.title + '(2)',
      category: platoUpdate.category,
      alergenos: platoUpdate.alergenos,
      thumb: platoUpdate.thumb,
      pictures: platoUpdate.pictures,
      price: platoUpdate.price,
      isFeatured: platoUpdate.isFeatured,
      tags: platoUpdate.tags ,
      activo: platoUpdate.activo,
      orden: platoUpdate.orden,
      ordenRecomendacion: platoUpdate.ordenRecomendacion,
      compraOnline: platoUpdate.compraOnline,
      standardOptions: platoUpdate.standardOptions,
      extraOptions: platoUpdate.extraOptions
    };

    const id = getUniqueId(4);
    this.db.object(path + id).set(plato);
    return Promise.resolve(id);

  }

  updateOrdenPlatoRecomendacion(platoUpdate: Platos): Promise<any> {
    console.log('plato: ', platoUpdate.$key);
    const path = 'platos/' + platoUpdate.$key;
    const plato = {
      ordenRecomendacion: platoUpdate.ordenRecomendacion,
    };
    return this.db.object(path).update(plato);

  }

  updateOrdenPlato(platoUpdate: Platos): Promise<any> {
    console.log('plato: ', platoUpdate.$key);
    const path = 'platos/' + platoUpdate.$key;
    const plato = {
      orden: platoUpdate.orden,
    };
    return this.db.object(path).update(plato);

  }


  updateActivoPlato(platoUpdate: Platos): Promise<any> {
    console.log('plato: ', platoUpdate.$key);
    const path = 'platos/' + platoUpdate.$key;
    const plato = {
      activo: platoUpdate.activo,
    };
    return this.db.object(path).update(plato);

  }

  updateRecomendacionPlato(platoUpdate: Platos): Promise<any> {
    console.log('plato: ', platoUpdate.$key);
    const path = 'platos/' + platoUpdate.$key;
    const plato = {
      isFeatured: platoUpdate.isFeatured,
    };
    return this.db.object(path).update(plato);

  }

  updateOnlinePlato(platoUpdate: Platos): Promise<any> {
    console.log('plato: ', platoUpdate.$key);
    const path = 'platos/' + platoUpdate.$key;
    const plato = {
      compraOnline: platoUpdate.compraOnline,
    };
    return this.db.object(path).update(plato);

  }

  updateGrupo(grupoUpdate: Grupos): Promise<any> {
    console.log('grupos: ', grupoUpdate.$key);
    const path = 'grupos/' + grupoUpdate.$key;
    const grupo = {
      desc: grupoUpdate.desc,
      title: grupoUpdate.title,
      thumb: grupoUpdate.thumb,
      featured: false,
      icon: '',
      url: grupoUpdate.url,
      activo: grupoUpdate.activo,
      orden: grupoUpdate.orden,
      generics: grupoUpdate.generics
    };
    if (grupoUpdate.$key !== '') {
      return this.db.object(path).update(grupo);
    } else {
      return this.db.object(path + getUniqueId(4)).set(grupo);
    }
  }

  updateGenerics(genericUpdate: Generics): Promise<any> {
    console.log('Generics: ', genericUpdate.$key);
    const path = 'generics/' + genericUpdate.$key;
    const generic = {
      icon: genericUpdate.icon,
      title: genericUpdate.title,
      mostrar: genericUpdate.mostrar,
      url: genericUpdate.url,
      grupo: genericUpdate.grupo,
      otros: genericUpdate.otros,
      boton: genericUpdate.boton
    };
    if (genericUpdate.$key !== '') {
      return this.db.object(path).update(generic);
    } else {
      return this.db.object(path + getUniqueId(4)).set(generic);
    }
  }


  removeGrupo(grupoId: string) {
    const path = 'grupos/' + grupoId;
    return this.db.object(path).remove();
  }

  removePlato(platoId: string) {
    const path = 'platos/' + platoId;
    return this.db.object(path).remove();
  }

  getUsers() {
    const path = 'users/';
    // return this.db.list(path).valueChanges();
    return this.db.list(path).snapshotChanges();
  }

  removeUser(userUid) {
    const path = 'users/' + userUid;
    return this.db.object(path).remove();
  }

  async getGrupos(): Promise<any[]> {
    return this.loadItems('grupos').then(items => {
      // items.forEach((x: any) => (
      //   x.icon = 'restaurant')
      // );
      return items;
    });
  }

  async getGruposByGenerics(genericsGuid): Promise<any[]> {
    return this.loadItems('grupos').then(items => items.filter((x: any) => x.generics === genericsGuid));

  }

  async getNoGruposByGenerics(genericsGuid): Promise<any[]> {
    return this.loadItems('grupos').then(items => items.filter((x: any) => x.generics !== genericsGuid));

  }


  async getGenericById(id: string): Promise<any> {
    return this.loadItems('generics').then(items => items.filter((x: any) => x.guid === id));

  }

  async getGruposSelect(): Promise<IOption[]> {
    return this.loadItems('grupos').then(items => {
      const nuevo = items.map((x: any) => (
         {
           value: x.$key,
           label: x.title
         }
        )
      );
      return nuevo;
    });
  }

  async getCartasSelect(): Promise<SelectItem[]> {
    return this.loadItems('grupos').then(items => {
      const nuevo = items.map((x: any) => (
         {
           value: x.$key,
           label: x.title
         }
        )
      );
      return nuevo;
    });
  }

  async getGenericsSelect(): Promise<IOption[]> {
    return this.loadItems('generics').then(items => {

      const nuevo = items.filter(x => x.grupo).map((x: any) => (
         {
           value: x.$key,
           label: x.title
         }
        )
      );
      return nuevo;
    });
  }

  async getAlergenosSelect(): Promise<IOption[]> {
    return this.loadItems('alergenos').then(items => {
      const nuevo = items.map((x: any) => (
         {
           value: x.id,
           label: x.id
         }
        )
      );
      return nuevo;
    });
  }


  async getPlatos(): Promise<any[]> {
    return this.loadItems('platos').then(items => {
      // items.forEach((x: any) => (
      //   x.icon = 'restaurant')
      // );
      return items;
    });
  }

  async getPlatosByDesc(term: string): Promise<Platos[]> {
    return this.loadItems('platos').then(items => items.filter((x: any) => x.title.toLowerCase().includes(term)));
  }

  async getProductsByCategory(categoryGuid): Promise<any[]> {
    return this.loadItems('platos').then(items => items.filter((x: any) => x.category === categoryGuid));
  }

  async getGrupo(id: string): Promise<Grupos> {
    return this.loadItems('grupos').then(items => items.find((x: any) => x.$key === id));
  }

  async getPlato(id: string): Promise<Platos> {
    return this.loadItems('platos').then(items => items.find((x: any) => x.$key === id));
  }

  private loadItems(type: string) {
    return this.db
      .list(type)
      .snapshotChanges()
      .pipe(
        map(actions => actions.map( (action: any)  => ({ $key: action.key, ...action.payload.val() }))),
        tap(items => this.initArray(items)),
        take(1)
      )
      .toPromise();
  }

  getGenerics(): Promise<Generics[]> {
    return this.loadItems('generics').then(generics => {
      return generics.filter(x => x.mostrar);
    });
  }

  getAllGenerics(): Promise<Generics[]> {
    return this.loadItems('generics').then(generics => {
      return generics;
    });
  }

  getBusiness(): Promise<Local> {
    return this.db
      .object<any>('local')
      .snapshotChanges()
      .pipe(
        map(action => ({ $key: action.key, ...action.payload.val() })),
        tap(item => this.initItem(item)),
        take(1)
      )
      .toPromise();
  }

  updateBusiness( business: Local): Promise<any> {

    const local = {
      address:        business.address,
      desc:           business.desc,
      urlRedir:       business.urlRedir,
      email:          business.email,
      facebookPage:   business.facebookPage,
      instagramPage:  business.instagramPage,
      logo:           business.logo,
      map:            business.map,
      officeLocation: business.officeLocation,
      phoneNumber:    business.phoneNumber,
      pinterestPage:  business.pinterestPage,
      storeName:      business.storeName,
      twitterPage:    business.twitterPage,
      horario:        business.horario,
      pedidos:        business.pedidos,
      welcomeImages:  business.welcomeImages,
      welcomeButtonText: business.welcomeButtonText
    };

    return this.db.object('local').update(local);

  }

  getFeaturedProducts(): Promise<any[]> {
    return this.loadItems('platos').then(items => {
      return items.filter((x: any) => x.isFeatured);
    });
  }


  private getPobs(type: string) {
    return this.db
      .list(type)
      .snapshotChanges()
      .pipe(
        map(actions => actions.map((action: any) => ({ ...action.payload.val() }))),
        tap(items => this.initArray(items)),
        take(1)
      )
      .toPromise();
  }

  getPoblaciones(): Promise<Opciones[]> {
    return this.getPobs('poblaciones');
  }


  private initItem(item) {
    item.guid = item.$key;
  }

  private initArray(array) {
    return array.map( x => this.initItem(x));
  }

}
