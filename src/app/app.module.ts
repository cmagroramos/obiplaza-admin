import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Pruebas para Firestore
import {AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UsersComponent } from './users/users.component';
import { GruposComponent } from './grupos/grupos.component';
import { PlatosComponent } from './platos/platos.component';
import { PlatoComponent } from './platos/plato/plato.component';
import { ShareModule } from './share/share.module';
import { GrupoComponent } from './grupos/grupo/grupo.component';
import { TagInputModule } from 'ngx-chips';
import { CartasComponent } from './cartas/cartas.component';
import { CartaComponent } from './cartas/carta/carta.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidoComponent } from './pedidos/pedido/pedido.component';
import { PreparadoComponent } from './pedidos/preparado.component';
import { MoneyPipe } from './pipes/money.pipe';


import {TabViewModule} from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {CheckboxModule} from 'primeng/checkbox';
import {TooltipModule} from 'primeng/tooltip';
import {MenubarModule} from 'primeng/menubar';
import {MessageModule} from 'primeng/message';
import {RadioButtonModule} from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {PickListModule} from 'primeng/picklist';
import {PanelModule} from 'primeng/panel';
import {CarouselModule} from 'primeng/carousel';
import {OrderListModule} from 'primeng/orderlist';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    UsersComponent,
    GruposComponent,
    PlatosComponent,
    PlatoComponent,
    GrupoComponent,
    CartasComponent,
    CartaComponent,
    PedidosComponent,
    PedidoComponent,
    PreparadoComponent,
    MoneyPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    // Pruebas firestore
    AngularFirestoreModule,
    FormsModule,
    ShareModule,
    // PrimeNg
    TabViewModule,
    ButtonModule,
    ToolbarModule,
    CheckboxModule,
    TooltipModule,
    MenubarModule,
    MessageModule,
    RadioButtonModule,
    DropdownModule,
    InputMaskModule,
    PickListModule,
    PanelModule,
    CarouselModule,
    OrderListModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    TagInputModule,
    ToastrModule.forRoot( {
          timeOut: 2000,
          positionClass: 'toast-top-center'
        } )

  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es' }, MoneyPipe ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
