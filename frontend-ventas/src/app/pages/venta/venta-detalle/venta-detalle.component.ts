import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Persona } from './../../../_model/persona.model';
import { DetalleVenta } from 'src/app/_model/detalleVenta.model';
import { PersonaService } from 'src/app/_service/persona.service';
import { MatSnackBar } from '@angular/material';
import { Producto } from 'src/app/_model/producto.model';
import { ProductoService } from 'src/app/_service/producto.service';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styleUrls: ['./venta-detalle.component.css']
})
export class VentaDetalleComponent implements OnInit {

  personas: Persona[];
  productos: Producto[];
  detalleVenta: DetalleVenta[];


  idPersonaSeleccionada: number;
  idProductoSeleccionado: number;

  constructor(
    private personaService: PersonaService,
    private productoService: ProductoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.listaPersonas();
    this.listaProductos();
  }

  listaProductos(){
    this.productoService.listar().subscribe(data=>{
      this.productos = data;
    });
  }
  listaPersonas(){
    this.personaService.listar().subscribe(data=>{
      this.personas = data;
    });
  }

  operar(){
    console.log('funciona!');
  }

}
