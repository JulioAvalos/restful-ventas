import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Persona } from './../_model/persona.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personaCambio = new Subject<Persona[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/personas`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Persona[]>(this.url);
  }

  listarPorId(idPersona: number) {
    return this.http.get<Persona>(`${this.url}/${idPersona}`);
  }

  registrar(Persona: Persona) {
    return this.http.post(this.url, Persona);
  }

  modificar(Persona: Persona) {
    return this.http.put(this.url, Persona);
  }

  eliminar(idPersona: number) {
    return this.http.delete(`${this.url}/${idPersona}`);
  }
}
