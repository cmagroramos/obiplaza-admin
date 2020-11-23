import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = environment.title;
  items: MenuItem[];

  constructor( public auth: AuthService,
               private toastr: ToastrService ) {

  }

  ngOnInit() {
    this.items = [
      {
          label: 'Home',
          routerLink: '/',
          routerLinkActiveOptions: {exact: true},
          icon: 'pi pi-home',
      },
      {
          label: 'Cartas',
          items: [
              {label: 'Ver Cartas', icon: 'pi pi-list', routerLink: '/cartas'},
              {label: 'Nueva Carta', icon: 'pi pi-plus' , routerLink: '/carta'}
          ]
      },
      {
        label: 'Grupos',
        items: [
            {label: 'Ver Grupos', icon: 'pi pi-list', routerLink: '/grupos'},
            {label: 'Nuevo Grupo', icon: 'pi pi-plus', routerLink: '/grupo'}
        ]
      }, {
        label: 'Platos',
        items: [
            {label: 'Ver Platos', icon: 'pi pi-list', routerLink: '/platos'},
            {label: 'Nuevo Plato', icon: 'pi pi-plus', routerLink: '/plato'}
        ]
      }
  ];
  }

  signEmail() {
    this.auth.login().catch( error => {
      if (error.code === 'auth/wrong-password') {
        this.toastr.error('Contraseña no válida', 'Error login');
      } else if (error.code === 'auth/invalid-email'){
        this.toastr.error('Formato email no válido', 'Error login');
      }
    });
  }

}
