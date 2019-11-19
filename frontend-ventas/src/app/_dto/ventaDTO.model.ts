import { Persona } from '../_model/persona.model';
import { DetalleVenta } from '../_model/detalleVenta.model';

export class VentaDTO {
  persona: Persona;
  fecha: Date;
  importe: number;
  detalleVenta: DetalleVenta[];
}
