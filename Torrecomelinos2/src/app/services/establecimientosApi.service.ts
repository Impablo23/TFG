import { Injectable } from "@angular/core";
import { environments, environmentsApi } from "environments/environments";
import { HttpClient } from '@angular/common/http';
import { Usuario } from "../interfaces/usuario.interface";
import { Observable, catchError, map, noop, of, tap } from "rxjs";
import { Establecimiento } from "../interfaces/establecimiento.interface";
import { Zona } from "../interfaces/zona.interface";
import { Categoria } from "../interfaces/categoria.interface";
import { Favorito } from "../interfaces/favorito.interface";
import { Sugerencia } from "../interfaces/sugerencia.interface";
import { EstablecimientoApi } from '../interfaces/establecimientoApi.interface';
import { CategoriaApi } from "../interfaces/categoriaApi.interface";
import { ZonaApi } from "../interfaces/zonaApi.interface";
import { SugerenciaApi } from "../interfaces/sugerenciaApi.interface";

@Injectable({
  providedIn: 'root'
})
export class EstablecimientosApiService {
  constructor(private http: HttpClient) { }

  private baseUrl: string = environmentsApi.baseUrl


  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------ZONAS--------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------


  getZonasApi(): Observable<ZonaApi[]> {
    return this.http.get<ZonaApi[]>(`${this.baseUrl}/zonas`)
  }

  getZonaByNameApi(name: string): Observable<ZonaApi[]> {
    return this.http.get<ZonaApi[]>(`${this.baseUrl}/zonas/nombre/${name}`)
  }

  addZonaApi( zona : ZonaApi): Observable<string> {
    return this.http.post<string>(`${ this.baseUrl }/zonas/add`,zona)
  }

  getZonaApiById(id: number): Observable<ZonaApi[]> {
    return this.http.get<ZonaApi[]>(`${this.baseUrl}/zonas/id/${id}`)
  }


  updateZonaApi( zona : ZonaApi): Observable<string> {
    return this.http.put<string>(`${ this.baseUrl }/zonas/edit`, zona)
  }

  deleteZonaApi(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${ this.baseUrl }/zonas/delete/${id}`).pipe(map( response => true),catchError(error => of(false)))
  }


  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------CATEGORIAS---------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------



  getCategoriasApi(): Observable<CategoriaApi[]> {
    return this.http.get<CategoriaApi[]>(`${this.baseUrl}/categorias`)
  }

  getCategoriaByNameApi(name: string): Observable<CategoriaApi[]> {
    return this.http.get<CategoriaApi[]>(`${this.baseUrl}/categorias/nombre/${name}`)
  }

  addCategoriaApi( categoria : CategoriaApi): Observable<string> {
    return this.http.post<string>(`${ this.baseUrl }/categorias/add`,categoria)
  }

  getCategoriaApiById(id: number): Observable<CategoriaApi[]> {
    return this.http.get<CategoriaApi[]>(`${this.baseUrl}/categorias/id/${id}`)
  }


  updateCategoriaApi( categoria : CategoriaApi): Observable<string> {
    return this.http.put<string>(`${ this.baseUrl }/categorias/edit`, categoria)
  }

  deleteCategoriaApi(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${ this.baseUrl }/categorias/delete/${id}`).pipe(map( response => true),catchError(error => of(false)))
  }


  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------ESTABLECIMIENTOS---------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  getEstablecimientosApi(): Observable<EstablecimientoApi[]> {
    return this.http.get<EstablecimientoApi[]>(`${this.baseUrl}/establecimientos`)
  }

  getEstablecimientoApiById(id: number): Observable<EstablecimientoApi[]> {
    return this.http.get<EstablecimientoApi[]>(`${this.baseUrl}/establecimientos/id/${id}`)
  }

  addEstablecimientoApi( establecimiento : EstablecimientoApi): Observable<string> {
    return this.http.post<string>(`${ this.baseUrl }/establecimientos/add`,establecimiento)
  }

  updateEstablecimientoApi( establecimiento : EstablecimientoApi): Observable<string> {
    return this.http.put<string>(`${ this.baseUrl }/establecimientos/edit`, establecimiento)
  }

  deleteEstablecimientoApi(id : number): Observable<boolean> {
    return this.http.delete<boolean>(`${ this.baseUrl }/establecimientos/delete/${id}`).pipe(map( response => true),catchError(error => of(false)))
  }

  getEstablecimientosApiByName(name: string): Observable<EstablecimientoApi[]> {
    return this.http.get<EstablecimientoApi[]>(`${this.baseUrl}/establecimientos/nombre/${name}`)
  }




  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------FAVORITOS----------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  // getFavoritosByUser(id_usuario:string) : Observable<Favorito[]> {
  //   return this.http.get<Favorito[]>(`${this.baseUrl}/favoritos?id_usuario=${id_usuario}`)
  // }

  // getFavoritos() : Observable<Favorito[]> {
  //   return this.http.get<Favorito[]>(`${this.baseUrl}/favoritos`)
  // }

  // getFavoritoByUserByName(id_usuario:string, id_establecimiento:string) : Observable<Favorito[]> {
  //   return this.http.get<Favorito[]>(`${this.baseUrl}/favoritos?id_usuario=${id_usuario}&id_establecimiento=${id_establecimiento}`)
  // }

  // deleteFavorito(id_usuario: string,id_establecimiento: string): Observable<boolean> {
  //   return this.http.delete(`${this.baseUrl}/favoritos?id_usuario=${id_usuario}&id_establecimiento=${id_establecimiento}`).pipe(map( response => true),catchError(error => of(false)))
  // }

  // addFavorito(favorito: Favorito) : Observable<boolean> {
  //   return this.http.post(`${this.baseUrl}/favoritos`,favorito).pipe(map( response => true),catchError(error => of(false)))
  // }


  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------SUGERENCIAS--------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  getSugerenciasApi() : Observable<SugerenciaApi[]> {
    return this.http.get<SugerenciaApi[]>(`${this.baseUrl}/sugerencias`)
  }

  getSugerenciaApiById(id: number): Observable<SugerenciaApi[]> {
    return this.http.get<SugerenciaApi[]>(`${this.baseUrl}/sugerencias/id/${id}`)
  }

  deleteSugerenciaApi(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/sugerencias/delete/${id}`).pipe(map( response => true),catchError(error => of(false)))
  }

  // addSugerencia(sugerencia: Sugerencia) : Observable<boolean> {
  //   return this.http.post(`${this.baseUrl}/sugerencias`,sugerencia).pipe(map( response => true),catchError(error => of(false)))
  // }


}
