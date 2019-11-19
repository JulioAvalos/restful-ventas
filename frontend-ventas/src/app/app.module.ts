import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonaComponent } from './pages/persona/persona.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { PersonaEdicionComponent } from './pages/persona/persona-edicion/persona-edicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';
import { VentaComponent } from './pages/venta/venta.component';
import { VentaDetalleComponent } from './pages/venta/venta-detalle/venta-detalle.component';
import { VentaDialogoComponent } from './pages/venta/venta-dialogo/venta-dialogo.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    ProductoComponent,
    PersonaEdicionComponent,
    ProductoEdicionComponent,
    VentaComponent,
    VentaDetalleComponent,
    VentaDialogoComponent
  ],
  entryComponents: [VentaDialogoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
