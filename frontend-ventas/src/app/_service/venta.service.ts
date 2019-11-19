import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Venta } from '../_model/venta.model';
import { Subject } from 'rxjs';
import { VentaDTO } from '../_dto/ventaDTO.model';

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

  registrar(venta: VentaDTO) {
    return this.http.post(this.url, venta);
  }

}
