import { ProductoComponent } from './pages/producto/producto.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaEdicionComponent } from './pages/persona/persona-edicion/persona-edicion.component';
import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';
import { VentaComponent } from './pages/venta/venta.component';
import { VentaDetalleComponent } from './pages/venta/venta-detalle/venta-detalle.component';


const routes: Routes = [
  {
    path: 'persona', component: PersonaComponent, children: [
      { path: 'nuevo', component: PersonaEdicionComponent },
      { path: 'edicion/:id', component: PersonaEdicionComponent }
    ]
  },
  {
    path: 'producto', component: ProductoComponent, children: [
      { path: 'nuevo', component: ProductoEdicionComponent },
      { path: 'edicion/:id', component: ProductoEdicionComponent }
    ]
  },
  {
    path: 'venta', component: VentaComponent, children: [
      { path: 'nuevo', component: VentaDetalleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
