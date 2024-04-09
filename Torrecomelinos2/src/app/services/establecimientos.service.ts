import { Injectable } from "@angular/core";
import { environments } from "environments/environments";
import { HttpClient } from '@angular/common/http';
import { Usuario } from "../interfaces/usuario.interface";
import { Observable, catchError, map, noop, of, tap } from "rxjs";
import { Establecimiento } from "../interfaces/establecimiento.interface";
import { Zona } from "../interfaces/zona.interface";
import { Categoria } from "../interfaces/categoria.interface";
import { Favorito } from "../interfaces/favorito.interface";
import { Sugerencia } from "../interfaces/sugerencia.interface";

@Injectable({
  providedIn: 'root'
})
export class EstablecimientosJsonService {
  constructor(private http: HttpClient) { }

  private baseUrl: string = environments.baseUrl


  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------ZONAS--------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------


  getZonas(): Observable<Zona[]> {
    return this.http.get<Zona[]>(`${this.baseUrl}/zonas`)
  }

  getZonaByName(name: string): Observable<Zona[]> {
    return this.http.get<Zona[]>(`${this.baseUrl}/zonas?nombre=${name}`)
  }

  getZonaById(id: number): Observable<Zona[]> {
    return this.http.get<Zona[]>(`${this.baseUrl}/zonas?id=${id}`)
  }

  addZona( zona : Zona): Observable<boolean> {
    return this.http.post<Zona>(`${ this.baseUrl }/zonas`,zona).pipe(map( response => true),catchError(error => of(false)))
  }

  updateZona( zona : Zona): Observable<boolean> {
    return this.http.patch<Zona>(`${ this.baseUrl }/zonas/${ zona.id }`, zona).pipe(map( response => true),catchError(error => of(false)))
  }

  deleteZona(id: string): Observable<boolean> {
    return this.http.delete(`${ this.baseUrl }/zonas/${id}`).pipe(map( response => true),catchError(error => of(false)))
  }


  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------CATEGORIAS---------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------



  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias`)
  }

  getCategoriasByName(name: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias?nombre=${name}`)
  }

  getCategoriasById(id: number): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias?id=${id}`)
  }

  addCategoria( categoria : Categoria): Observable<boolean> {
    return this.http.post<Categoria>(`${ this.baseUrl }/categorias`,categoria).pipe(map( response => true),catchError(error => of(false)))
  }

  updateCategoria(categoria : Categoria): Observable<boolean> {
    return this.http.patch<Categoria>(`${ this.baseUrl }/categorias/${ categoria.id }`, categoria).pipe(map( response => true),catchError(error => of(false)))
  }

  deleteCategoria(id: string): Observable<boolean> {
    return this.http.delete(`${ this.baseUrl }/categorias/${id}`).pipe(map( response => true),catchError(error => of(false)))
  }


  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------ESTABLECIMIENTOS---------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  getEstablecimientos(): Observable<Establecimiento[]> {
    return this.http.get<Establecimiento[]>(`${this.baseUrl}/establecimientos`)
  }

  getEstablecimientoById(id: string): Observable<Establecimiento[]> {
    return this.http.get<Establecimiento[]>(`${this.baseUrl}/establecimientos?id=${id}`)
  }

  getEstablecimientosByName(name: string): Observable<Establecimiento[]> {
    return this.http.get<Establecimiento[]>(`${this.baseUrl}/establecimientos?nombre=${name}`)
  }

  deleteEstablecimiento(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/establecimientos/${id}`).pipe(map( response => true),catchError(error => of(false)))
  }

  updateEstablecimiento( establecimiento : Establecimiento): Observable<boolean> {
    return this.http.patch<Establecimiento>(`${ this.baseUrl }/establecimientos/${ establecimiento.id }`, establecimiento).pipe(map( response => true),catchError(error => of(false)))
  }

  addEstablecimiento( establecimiento : Establecimiento): Observable<boolean> {
    return this.http.post<Establecimiento>(`${ this.baseUrl }/establecimientos`,establecimiento).pipe(map( response => true),catchError(error => of(false)))
  }

  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------FAVORITOS----------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  getFavoritosByUser(id_usuario:string) : Observable<Favorito[]> {
    return this.http.get<Favorito[]>(`${this.baseUrl}/favoritos?id_usuario=${id_usuario}`)
  }

  getFavoritos() : Observable<Favorito[]> {
    return this.http.get<Favorito[]>(`${this.baseUrl}/favoritos`)
  }

  getFavoritoByUserByName(id_usuario:string, id_establecimiento:string) : Observable<Favorito[]> {
    return this.http.get<Favorito[]>(`${this.baseUrl}/favoritos?id_usuario=${id_usuario}&id_establecimiento=${id_establecimiento}`)
  }

  deleteFavorito(id_usuario: string,id_establecimiento: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/favoritos?id_usuario=${id_usuario}&id_establecimiento=${id_establecimiento}`).pipe(map( response => true),catchError(error => of(false)))
  }

  addFavorito(favorito: Favorito) : Observable<boolean> {
    return this.http.post(`${this.baseUrl}/favoritos`,favorito).pipe(map( response => true),catchError(error => of(false)))
  }


  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------SUGERENCIAS--------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  getSugerencias() : Observable<Sugerencia[]> {
    return this.http.get<Sugerencia[]>(`${this.baseUrl}/sugerencias`)
  }

  getSugerenciaById(id: string): Observable<Sugerencia[]> {
    return this.http.get<Sugerencia[]>(`${this.baseUrl}/sugerencias?id=${id}`)
  }

  deleteSugerencia(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/sugerencias/${id}`).pipe(map( response => true),catchError(error => of(false)))
  }

  addSugerencia(sugerencia: Sugerencia) : Observable<boolean> {
    return this.http.post(`${this.baseUrl}/sugerencias`,sugerencia).pipe(map( response => true),catchError(error => of(false)))
  }


}
