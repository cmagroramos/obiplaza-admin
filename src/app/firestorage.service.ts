import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {


  // task: AngularFireUploadTask = null;
  uploadProgress = new Observable();
  downloadURL = of('');


  constructor(public firestorage: AngularFireStorage,
              public auth: AuthService) { }

  upload(event, clave: string, nombre: string) {
    console.log('event: ', event);

    let ext = '.jpg';
    if (event.target.files[0].type === 'image/png') {
      ext = '.png';
    }

    const path = clave + '/' + nombre + ext;
    const ref = this.firestorage.ref(path);
    return  this.firestorage.upload(path, event.target.files[0]);
    // this.uploadProgress = this.task.percentageChanges();
    // this.task.snapshotChanges().pipe( finalize( () => {
    //   this.downloadURL = ref.getDownloadURL();
    //   this.downloadURL.subscribe(console.log);
    // })).subscribe();



  }

  // getImage(carpeta: string, id: string) {
  //   const storage = this.firestorage.storage;
  //   const pathReference = storage.ref(`${carpeta}/${id}.jpeg´);

  // }
  }
