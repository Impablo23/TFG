import { Injectable } from "@angular/core";
import { environmentsApi } from "environments/environments";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from "rxjs";

import { UsuarioApi } from "../interfaces/usuarioApi.interface";
import { RolApi } from "../interfaces/rolApi.interface";
import { RegistroApi } from "../interfaces/registroApi.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private baseUrl: string = environmentsApi.baseUrl

  constructor(private http: HttpClient) { }

  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------ROLES--------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  getRoles(): Observable<RolApi[]> {
    return this.http.get<RolApi[]>(`${this.baseUrl}/roles`)
  }

  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------USUARIOS-----------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------


  private usuariosSubject = new BehaviorSubject<UsuarioApi[]>([]);
  public usuarios$ = this.usuariosSubject.asObservable();

  actualizarUsuarios(usuarios: UsuarioApi[]) {
    this.usuariosSubject.next(usuarios);
  }

  getUsersApi(): Observable<UsuarioApi[]> {
    return this.http.get<UsuarioApi[]>(`${this.baseUrl}/users`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener los usuarios:', error);
          return of([]);
        }),
        map(usuarios => {
          // Actualiza el servicio compartido con las categorías obtenidas
          this.actualizarUsuarios(usuarios);
          return usuarios;
        })
      );
  }

  addUserApi(usuario: UsuarioApi): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/users/add`, usuario)
      .pipe(
        catchError(error => {
          console.error('Error al agregar el usuario:', error);
          return of('');
        }),
        map(response => {
          // Al agregar una categoría, actualiza la lista de categorías
          this.getUsersApi().subscribe();
          return response;
        })
      );
  }

  updateUserApi(usuario: UsuarioApi): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/users/edit`, usuario)
      .pipe(
        catchError(error => {
          console.error('Error al actualizar el usuario:', error);
          return of('');
        }),
        map(response => {
          // Al actualizar una categoría, actualiza la lista de categorías
          this.getUsersApi().subscribe();
          return response;
        })
      );
  }

  deleteUserApi(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/users/delete/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar el usuario:', error);
          return of(false);
        }),
        map(response => {
          // Al eliminar una categoría, actualiza la lista de categorías
          this.getUsersApi().subscribe();
          return response;
        })
      );
  }

  getUsersApiById(id: number): Observable<UsuarioApi[]> {
    return this.http.get<UsuarioApi[]>(`${this.baseUrl}/users/id/${id}`)
  }

  getUserByEmailAndPass(email: string, passwd: string): Observable<UsuarioApi[]> {
    return this.http.get<UsuarioApi[]>(`${this.baseUrl}/users/${email}/${passwd}`)
  }

  getUserByEmail(email: string): Observable<UsuarioApi[]> {
    return this.http.get<UsuarioApi[]>(`${this.baseUrl}/users/email/${email}`)
  }

  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------REGISTRO-----------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  addRegistroApi(registro: RegistroApi): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/registros/add`,registro)
  }

  getRegistroApi(): Observable<RegistroApi[]> {
    return this.http.get<RegistroApi[]>(`${this.baseUrl}/registros`)
  }


  obtenerFechaYHora(fechaISO: string): string {
    // Convertir la cadena de fecha ISO a objeto Date
    const fechaHora = new Date(fechaISO);

    // Obtener la fecha y la hora en formato local
    const fechaLocal = fechaHora.toLocaleDateString();
    const horaLocal = fechaHora.toLocaleTimeString([], { hour12: false });

    // Concatenar la fecha y la hora
    const fechaYHora = `${fechaLocal} ${horaLocal}`;

    // Devolver la fecha y la hora concatenadas
    return fechaYHora;
}



}
