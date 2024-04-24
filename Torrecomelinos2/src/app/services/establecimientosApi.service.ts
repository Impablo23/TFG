import { Injectable } from "@angular/core";
import { environmentsApi } from "environments/environments";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, noop, of, tap } from "rxjs";

import { EstablecimientoApi } from '../interfaces/establecimientoApi.interface';
import { CategoriaApi } from "../interfaces/categoriaApi.interface";
import { ZonaApi } from "../interfaces/zonaApi.interface";
import { SugerenciaApi } from '../interfaces/sugerenciaApi.interface';
import { FavoritoApi } from "../interfaces/favoritoApi.interface";

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

  private zonasSubject = new BehaviorSubject<ZonaApi[]>([]);
  public zonas$ = this.zonasSubject.asObservable();

  actualizarZonas(zonas: ZonaApi[]) {
    this.zonasSubject.next(zonas);
  }

  getZonasApi(token: string): Observable<ZonaApi[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<ZonaApi[]>(`${this.baseUrl}/zonas`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al obtener las zonas:', error);
          return of([]);
        }),
        map(zonas => {
          // Actualiza el servicio compartido con las zonas obtenidas
          this.actualizarZonas(zonas);
          return zonas;
        })
      );
  }

  addZonaApi(zona: ZonaApi,token: string): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<string>(`${this.baseUrl}/zonas/add`, zona, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al agregar la zona:', error);
          return of('');
        }),
        map(response => {
          // Al agregar una zona, actualiza la lista de zonas
          this.getZonasApi(token).subscribe();
          return response;
        })
      );
  }

  updateZonaApi(zona: ZonaApi,token: string): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put<string>(`${this.baseUrl}/zonas/edit`, zona, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al actualizar la zona:', error);
          return of('');
        }),
        map(response => {
          // Al actualizar una zona, actualiza la lista de zonas
          this.getZonasApi(token).subscribe();
          return response;
        })
      );
  }

  deleteZonaApi(id: number,token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete<boolean>(`${this.baseUrl}/zonas/delete/${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al eliminar la zona:', error);
          return of(false);
        }),
        map(response => {
          // Al eliminar una zona, actualiza la lista de zonas
          this.getZonasApi(token).subscribe();
          return response;
        })
      );
  }

  getZonaByNameApi(name: string,token: string): Observable<ZonaApi[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<ZonaApi[]>(`${this.baseUrl}/zonas/nombre/${name}`, { headers })
  }

  getZonaApiById(id: number,token: string): Observable<ZonaApi[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<ZonaApi[]>(`${this.baseUrl}/zonas/id/${id}`, { headers })
  }

  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------CATEGORIAS---------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  private categoriasSubject = new BehaviorSubject<ZonaApi[]>([]);
  public categorias$ = this.categoriasSubject.asObservable();

  actualizarCategorias(categorias: CategoriaApi[]) {
    this.categoriasSubject.next(categorias);
  }

  getCategoriasApi(token: string): Observable<CategoriaApi[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<CategoriaApi[]>(`${this.baseUrl}/categorias`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al obtener las categorías:', error);
          return of([]);
        }),
        map(categorias => {
          // Actualiza el servicio compartido con las categorías obtenidas
          this.actualizarCategorias(categorias);
          return categorias;
        })
      );
  }

  addCategoriaApi(categoria: CategoriaApi,token: string): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<string>(`${this.baseUrl}/categorias/add`, categoria, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al agregar la categoría:', error);
          return of('');
        }),
        map(response => {
          // Al agregar una categoría, actualiza la lista de categorías
          this.getCategoriasApi(token).subscribe();
          return response;
        })
      );
  }

  updateCategoriaApi(categoria: CategoriaApi,token: string): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put<string>(`${this.baseUrl}/categorias/edit`, categoria, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al actualizar la categoría:', error);
          return of('');
        }),
        map(response => {
          // Al actualizar una categoría, actualiza la lista de categorías
          this.getCategoriasApi(token).subscribe();
          return response;
        })
      );
  }

  deleteCategoriaApi(id: number,token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete<boolean>(`${this.baseUrl}/categorias/delete/${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al eliminar la categoría:', error);
          return of(false);
        }),
        map(response => {
          // Al eliminar una categoría, actualiza la lista de categorías
          this.getCategoriasApi(token).subscribe();
          return response;
        })
      );
  }


  getCategoriaByNameApi(name: string,token: string): Observable<CategoriaApi[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<CategoriaApi[]>(`${this.baseUrl}/categorias/nombre/${name}`, { headers })
  }

  getCategoriaApiById(id: number,token: string): Observable<CategoriaApi[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<CategoriaApi[]>(`${this.baseUrl}/categorias/id/${id}`, { headers })
  }


  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------ESTABLECIMIENTOS---------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  getEstablecimientosApi(token: string): Observable<EstablecimientoApi[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<EstablecimientoApi[]>(`${this.baseUrl}/establecimientos`, { headers })
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

  getEstablecimientoApiById(id: number,token: string): Observable<EstablecimientoApi[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<EstablecimientoApi[]>(`${this.baseUrl}/establecimientos/id/${id}`, { headers })
  }




  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------FAVORITOS----------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  getFavoritosByUserApi(id_usuario:number,token:string) : Observable<FavoritoApi[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<FavoritoApi[]>(`${this.baseUrl}/favoritos/id_usuario/${id_usuario}`, { headers })
  }

  // getFavoritosApi() : Observable<FavoritoApi[]> {
  //   return this.http.get<FavoritoApi[]>(`${this.baseUrl}/favoritos`)
  // }

  getFavoritoByUserByNameApi(id_usuario:number, id_establecimiento:number,token:string) : Observable<FavoritoApi[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<FavoritoApi[]>(`${this.baseUrl}/favoritos/id_usuario/${id_usuario}/id_establecimiento/${id_establecimiento}`, { headers })
  }

  deleteFavoritoApi(id: number,token:string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete(`${this.baseUrl}/favoritos/delete/${id}`, { headers }).pipe(map( response => true),catchError(error => of(false)))
  }

  addFavoritoApi(favorito: FavoritoApi,token:string) : Observable<string> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<string>(`${this.baseUrl}/favoritos/add`,favorito, { headers })
  }


  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------SUGERENCIAS--------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  private sugerenciasSubject = new BehaviorSubject<SugerenciaApi[]>([]);
  public sugerencias$ = this.sugerenciasSubject.asObservable();

  actualizarSugerencias(sugerencias: SugerenciaApi[]) {
    this.sugerenciasSubject.next(sugerencias);
  }

  getSugerenciasApi(token: string): Observable<SugerenciaApi[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<SugerenciaApi[]>(`${this.baseUrl}/sugerencias`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al obtener las sugerencias:', error);
          return of([]);
        }),
        map(sugerencias => {
          // Actualiza el servicio compartido con las sugerencias obtenidas
          this.actualizarSugerencias(sugerencias);
          return sugerencias;
        })
      );
  }

  deleteSugerenciaApi(id: number,token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete<boolean>(`${this.baseUrl}/sugerencias/delete/${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al eliminar la sugerencia:', error);
          return of(false);
        }),
        map(response => {
          // Al eliminar una categoría, actualiza la lista de sugerencias
          this.getSugerenciasApi(token).subscribe();
          return response;
        })
      );
  }



  // getSugerenciasApi() : Observable<SugerenciaApi[]> {
  //   return this.http.get<SugerenciaApi[]>(`${this.baseUrl}/sugerencias`)
  // }

  getSugerenciaApiById(id: number,token: string): Observable<SugerenciaApi[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<SugerenciaApi[]>(`${this.baseUrl}/sugerencias/id/${id}`, { headers })
  }

  // deleteSugerenciaApi(id: number): Observable<boolean> {
  //   return this.http.delete<boolean>(`${this.baseUrl}/sugerencias/delete/${id}`).pipe(map( response => true),catchError(error => of(false)))
  // }

  addSugerenciaApi(sugerencia: SugerenciaApi,token: string) : Observable<string> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<string>(`${this.baseUrl}/sugerencias/add`,sugerencia, { headers })
  }


}
