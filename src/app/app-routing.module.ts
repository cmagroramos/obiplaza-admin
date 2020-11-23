import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GruposComponent } from './grupos/grupos.component';
import { PlatosComponent } from './platos/platos.component';
import { PlatoComponent } from './platos/plato/plato.component';
import { GrupoComponent } from './grupos/grupo/grupo.component';
import { CartasComponent } from './cartas/cartas.component';
import { CartaComponent } from './cartas/carta/carta.component';
// import { PedidoComponent } from './pedidos/pedido/pedido.component';
// import { PedidosComponent } from './pedidos/pedidos.component';
// import { PreparadoComponent } from './pedidos/preparado.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'platos', component: PlatosComponent},
  {path: 'platos/:id', component: PlatosComponent},
  {path: 'plato', component: PlatoComponent},
  {path: 'plato/:id', component: PlatoComponent},
  {path: 'grupos', component: GruposComponent},
  {path: 'grupo/:id', component: GrupoComponent},
  {path: 'grupo', component: GrupoComponent},
  {path: 'cartas', component: CartasComponent},
  {path: 'carta/:id', component: CartaComponent},
  {path: 'carta', component: CartaComponent},
  // {path: 'cocina', component: PedidosComponent},
  // {path: 'preparado', component: PreparadoComponent},
  // {path: 'pedido/:id', component: PedidoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
