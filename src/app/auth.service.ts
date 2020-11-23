import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { FireDbService } from './fire-db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email = '';
  pass = '';
  authUser = null;

  constructor(public authService: AngularFireAuth,
              private router: Router,
              private db: FireDbService) { }

  user = this.authService.authState.pipe ( map( authState => {
    console.log('authState: ', authState);
    // TODO Aqui podría ir a buscar el menú
    if (authState) {
      this.authUser = authState;
      return authState;
    } else {
      return null;
    }
  } ))

  login(){
    console.log('login!');
    return this.authService.auth.signInWithEmailAndPassword(this.email, this.pass)
    .then( user => {
      console.log('user logado con email: ', user);
      this.email = '';
      this.pass = '';
      this.authUser = user.user;
      this.db.updateUserData(user.user);
    });
  }

  glogin() {
    console.log('google login!');
    this.authService.auth.signInWithPopup( new auth.GoogleAuthProvider() )
    .then( user => {
      console.log('user logado: ', user);
      this.email = '';
      this.pass = '';
      this.authUser = user.user;
      this.db.updateUserData(user.user);
    })
    .catch( error => {
      console.log('error en google login: ', error);
    });
  }

  logout() {
    console.log('logout!');
    this.authService.auth.signOut();
    this.email = '';
    this.pass = '';
    this.router.navigate(['/']);
  }

}
