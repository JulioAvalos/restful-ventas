import { Producto } from './producto.model';
import { Venta } from './venta.model';

export class DetalleVenta {
    idDetalleVenta: number;
    cantidad: number;
    producto: Producto;
}
