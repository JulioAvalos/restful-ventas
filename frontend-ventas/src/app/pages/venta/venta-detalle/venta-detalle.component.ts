import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Persona } from './../../../_model/persona.model';
import { DetalleVenta } from 'src/app/_model/detalleVenta.model';
import { PersonaService } from 'src/app/_service/persona.service';
import { MatSnackBar } from '@angular/material';
import { Producto } from 'src/app/_model/producto.model';
import { ProductoService } from 'src/app/_service/producto.service';
import { VentaDTO } from 'src/app/_dto/ventaDTO.model';
import { VentaService } from 'src/app/_service/venta.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styleUrls: ['./venta-detalle.component.css']
})
export class VentaDetalleComponent implements OnInit {

  personas: Persona[];
  productos: Producto[];
  detalleVenta: DetalleVenta[] = [];

  idPersonaSeleccionada: number;
  idProductoSeleccionado: number;
  cantidadProducto: number;

  mensaje: string;

  constructor(
    private personaService: PersonaService,
    private productoService: ProductoService,
    private ventaService: VentaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.listaPersonas();
    this.listaProductos();
  }

  listaProductos() {
    this.productoService.listar().subscribe(data => {
      this.productos = data;
    });
  }
  listaPersonas() {
    this.personaService.listar().subscribe(data => {
      this.personas = data;
    });
  }

  operar() {
    console.log('funciona!');
  }

  agregar() {
    // console.log('%s, %s', this.idProductoSeleccionado, this.cantidadProducto);
    if (this.idProductoSeleccionado && this.cantidadProducto) {

      let cont = 0;

      for (let i = 0; this.detalleVenta.length > i; i++) {
        const venta = this.detalleVenta[i];
        if (venta.producto.idProducto === this.idProductoSeleccionado) {
          cont++;
          break;
        }
      }

      if (cont > 0) {
        this.mensaje = 'El producto se encuentra en la lista!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      } else {
        const det = new DetalleVenta();
        det.producto = this.productos.find(producto => {
          return producto.idProducto === this.idProductoSeleccionado;
        });
        det.cantidad = this.cantidadProducto;
        this.detalleVenta.push(det);

        this.idProductoSeleccionado = null;
        this.cantidadProducto = null;
        // console.log(this.detalleVenta);
      }
    }
  }

  removerVenta(index: number) {
    this.detalleVenta.splice(index, 1);
  }

  aceptar() {
    let persona = new Persona();
    persona.idPersona = this.idPersonaSeleccionada;

    let ventaDto = new VentaDTO();
    ventaDto.persona = persona;
    ventaDto.importe = this.calcularImporteTotal();
    ventaDto.fecha = (new Date(Date.now()));
    ventaDto.detalleVenta = this.detalleVenta;

    this.ventaService.registrar(ventaDto).pipe(switchMap(() => {
      return this.ventaService.listar();
    })).subscribe(data => {
      this.ventaService.mensajeCambio.next('Se registro la venta!');
      this.ventaService.ventaCambio.next(data);
      setTimeout(() => {
        this.limpiarControles();
      }, 2000);
    });
  }

  estadoBotonRegistrar() {
    return (this.detalleVenta.length === 0 || this.idProductoSeleccionado === 0 || this.idPersonaSeleccionada === 0);
  }

  calcularImporteTotal() {
    // no se definio precio del producto, por tanto
    // para el ejercicio, usaremos la siguiente formula:
    // el importe se dara segun (cantidad productos x precio base)

    let totalMultiplicador = 0;
    this.detalleVenta.forEach(data => {
      totalMultiplicador += data.cantidad;
    });

    const precioFijoImporte = 5.25;

    return totalMultiplicador * precioFijoImporte;
  }

  limpiarControles() {
    this.detalleVenta = [];
    this.idPersonaSeleccionada = 0;
    this.idProductoSeleccionado = 0;
    this.cantidadProducto = 0;
  }

}
