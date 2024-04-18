import { Injectable } from "@angular/core";
import { environmentsApi } from "environments/environments";
import { HttpClient } from '@angular/common/http';
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

  getZonasApi(): Observable<ZonaApi[]> {
    return this.http.get<ZonaApi[]>(`${this.baseUrl}/zonas`)
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

  addZonaApi(zona: ZonaApi): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/zonas/add`, zona)
      .pipe(
        catchError(error => {
          console.error('Error al agregar la zona:', error);
          return of('');
        }),
        map(response => {
          // Al agregar una zona, actualiza la lista de zonas
          this.getZonasApi().subscribe();
          return response;
        })
      );
  }

  updateZonaApi(zona: ZonaApi): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/zonas/edit`, zona)
      .pipe(
        catchError(error => {
          console.error('Error al actualizar la zona:', error);
          return of('');
        }),
        map(response => {
          // Al actualizar una zona, actualiza la lista de zonas
          this.getZonasApi().subscribe();
          return response;
        })
      );
  }

  deleteZonaApi(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/zonas/delete/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar la zona:', error);
          return of(false);
        }),
        map(response => {
          // Al eliminar una zona, actualiza la lista de zonas
          this.getZonasApi().subscribe();
          return response;
        })
      );
  }

  getZonaByNameApi(name: string): Observable<ZonaApi[]> {
    return this.http.get<ZonaApi[]>(`${this.baseUrl}/zonas/nombre/${name}`)
  }

  getZonaApiById(id: number): Observable<ZonaApi[]> {
    return this.http.get<ZonaApi[]>(`${this.baseUrl}/zonas/id/${id}`)
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

  getCategoriasApi(): Observable<CategoriaApi[]> {
    return this.http.get<CategoriaApi[]>(`${this.baseUrl}/categorias`)
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

  addCategoriaApi(categoria: CategoriaApi): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/categorias/add`, categoria)
      .pipe(
        catchError(error => {
          console.error('Error al agregar la categoría:', error);
          return of('');
        }),
        map(response => {
          // Al agregar una categoría, actualiza la lista de categorías
          this.getCategoriasApi().subscribe();
          return response;
        })
      );
  }

  updateCategoriaApi(categoria: CategoriaApi): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/categorias/edit`, categoria)
      .pipe(
        catchError(error => {
          console.error('Error al actualizar la categoría:', error);
          return of('');
        }),
        map(response => {
          // Al actualizar una categoría, actualiza la lista de categorías
          this.getCategoriasApi().subscribe();
          return response;
        })
      );
  }

  deleteCategoriaApi(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/categorias/delete/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar la categoría:', error);
          return of(false);
        }),
        map(response => {
          // Al eliminar una categoría, actualiza la lista de categorías
          this.getCategoriasApi().subscribe();
          return response;
        })
      );
  }


  getCategoriaByNameApi(name: string): Observable<CategoriaApi[]> {
    return this.http.get<CategoriaApi[]>(`${this.baseUrl}/categorias/nombre/${name}`)
  }

  getCategoriaApiById(id: number): Observable<CategoriaApi[]> {
    return this.http.get<CategoriaApi[]>(`${this.baseUrl}/categorias/id/${id}`)
  }


  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------ESTABLECIMIENTOS---------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  getEstablecimientosApi(): Observable<EstablecimientoApi[]> {
    return this.http.get<EstablecimientoApi[]>(`${this.baseUrl}/establecimientos`)
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

  getEstablecimientoApiById(id: number): Observable<EstablecimientoApi[]> {
    return this.http.get<EstablecimientoApi[]>(`${this.baseUrl}/establecimientos/id/${id}`)
  }




  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------FAVORITOS----------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  getFavoritosByUserApi(id_usuario:number) : Observable<FavoritoApi[]> {
    return this.http.get<FavoritoApi[]>(`${this.baseUrl}/favoritos/id_usuario/${id_usuario}`)
  }

  getFavoritosApi() : Observable<FavoritoApi[]> {
    return this.http.get<FavoritoApi[]>(`${this.baseUrl}/favoritos`)
  }

  getFavoritoByUserByNameApi(id_usuario:number, id_establecimiento:number) : Observable<FavoritoApi[]> {
    return this.http.get<FavoritoApi[]>(`${this.baseUrl}/favoritos/id_usuario/${id_usuario}/id_establecimiento/${id_establecimiento}`)
  }

  deleteFavoritoApi(id: number): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/favoritos/delete/${id}`).pipe(map( response => true),catchError(error => of(false)))
  }

  addFavoritoApi(favorito: FavoritoApi) : Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/favoritos/add`,favorito)
  }


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

  addSugerenciaApi(sugerencia: SugerenciaApi) : Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/sugerencias/add`,sugerencia)
  }


}
