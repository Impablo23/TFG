import { Injectable } from "@angular/core";
import { environments } from "environments/environments";
import { HttpClient } from '@angular/common/http';
import { Usuario } from "../interfaces/usuario.interface";
import { Observable, catchError, map, of, tap } from "rxjs";
import { Establecimiento } from "../interfaces/establecimiento.interface";
import { Zona } from "../interfaces/zona.interface";
import { Categoria } from "../interfaces/categoria.interface";

@Injectable({
  providedIn: 'root'
})
export class EstablecimientosJsonService {
  constructor(private http: HttpClient) { }

  private baseUrl: string = environments.baseUrl

  getEstablecimientos(): Observable<Establecimiento[]> {
    return this.http.get<Establecimiento[]>(`${this.baseUrl}/establecimientos`)
  }

  getZonas(): Observable<Zona[]> {
    return this.http.get<Zona[]>(`${this.baseUrl}/zonas`)
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias`)
  }

  getEstablecimientoById(id: number): Observable<Establecimiento[]> {
    return this.http.get<Establecimiento[]>(`${this.baseUrl}/establecimientos?id=${id}`)
  }

  deleteEstablecimiento(id: number): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/establecimientos/${id}`).pipe(map( response => true),catchError(error => of(false)))
  }




}
