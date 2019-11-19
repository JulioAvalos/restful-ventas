import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Venta } from '../_model/venta.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  ventaCambio = new Subject<Venta[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/ventas`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Venta[]>(this.url);
  }

  listarPorId(idVenta: number) {
    return this.http.get<Venta>(`${this.url}/${idVenta}`);
  }

  registrar(venta: Venta) {
    return this.http.post(this.url, venta);
  }

  modificar(venta: Venta) {
    return this.http.put(this.url, venta);
  }

  eliminar(idVenta: number) {
    return this.http.delete(`${this.url}/${idVenta}`);
  }
}
