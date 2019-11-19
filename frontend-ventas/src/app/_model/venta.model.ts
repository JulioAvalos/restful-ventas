import { Persona } from './persona.model';
import { DetalleVenta } from './detalleVenta.model';

export class Venta {
  idVenta: number;
  fecha: Date;
  importe: number;
  persona: Persona;
  detalleVenta: DetalleVenta[];
}
