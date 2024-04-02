import { Injectable } from "@angular/core";
import { environments } from "environments/environments";
import { HttpClient } from '@angular/common/http';
import { Usuario } from "../interfaces/usuario.interface";
import { Observable, catchError, map, of, tap } from "rxjs";
import { Establecimiento } from "../interfaces/establecimiento.interface";
import { Zona } from "../interfaces/zona.interface";
import { Categoria } from "../interfaces/categoria.interface";
import { Favorito } from "../interfaces/favorito.interface";

@Injectable({
  providedIn: 'root'
})
export class EstablecimientosJsonService {
  constructor(private http: HttpClient) { }

  private baseUrl: string = environments.baseUrl

  // Operaciones para la obtencion de datos

  getEstablecimientos(): Observable<Establecimiento[]> {
    return this.http.get<Establecimiento[]>(`${this.baseUrl}/establecimientos`)
  }

  getEstablecimientosByName(name: string): Observable<Establecimiento[]> {
    return this.http.get<Establecimiento[]>(`${this.baseUrl}/establecimientos?nombre=${name}`)
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

  // Operaciones con los establecimientos de eliminacion, inserccion y actualizacion

  deleteEstablecimiento(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/establecimientos/${id}`).pipe(map( response => true),catchError(error => of(false)))
  }

  updateEstablecimiento( establecimiento : Establecimiento): Observable<boolean> {
    return this.http.patch<Establecimiento>(`${ this.baseUrl }/establecimientos/${ establecimiento.id }`, establecimiento).pipe(map( response => true),catchError(error => of(false)))
  }

  addEstablecimiento( establecimiento : Establecimiento): Observable<boolean> {
    return this.http.post<Establecimiento>(`${ this.baseUrl }/establecimientos`,establecimiento).pipe(map( response => true),catchError(error => of(false)))
  }

  // Operaciones para recoger datos de los establecimientos favoritos
  getFavoritosByUser(id_usuario:string) : Observable<Favorito[]> {
    return this.http.get<Favorito[]>(`${this.baseUrl}/favoritos?id_usuario=${id_usuario}`)
  }

  getFavoritoByUserByName(id_usuario:string, id_establecimiento:string) : Observable<Favorito[]> {
    return this.http.get<Favorito[]>(`${this.baseUrl}/favoritos?id_usuario=${id_usuario}&id_establecimiento=${id_establecimiento}`)
  }



}
