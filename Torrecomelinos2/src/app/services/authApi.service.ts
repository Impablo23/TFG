import { Injectable } from "@angular/core";
import { environmentsApi } from "environments/environments";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, delay, map, of, tap } from "rxjs";

import { UsuarioApi } from "../interfaces/usuarioApi.interface";
import { RolApi } from "../interfaces/rolApi.interface";
import { RegistroApi } from "../interfaces/registroApi.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private baseUrl: string = environmentsApi.baseUrl

  constructor(private http: HttpClient) { }

  getToken(username: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post<any>('http://127.0.0.1:8000/token', formData);
  }

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

  // getUsersApi(): Observable<UsuarioApi[]> {
  //   return this.http.get<UsuarioApi[]>(`${this.baseUrl}/users`)
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error al obtener los usuarios:', error);
  //         return of([]);
  //       }),
  //       map(usuarios => {
  //         // Actualiza el servicio compartido con las categorías obtenidas
  //         this.actualizarUsuarios(usuarios);
  //         return usuarios;
  //       })
  //     );
  // }

  getUsersApi(token: string): Observable<UsuarioApi[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<UsuarioApi[]>(`${this.baseUrl}/users`, { headers })
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

  addUserApi(usuario: UsuarioApi,token:string): Observable<string> {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<string>(`${this.baseUrl}/users/add`, usuario)
      .pipe(
        catchError(error => {
          console.error('Error al agregar el usuario:', error);
          return of('');
        }),
        map(response => {
          // Al agregar una categoría, actualiza la lista de categorías
          this.getUsersApi(token).subscribe();
          return response;
        })
      );
  }

  updateUserApi(usuario: UsuarioApi, token: string): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/users/edit`, usuario)
      .pipe(
        delay(1000), // Agrega un retraso de 2000 milisegundos (2 segundos)
        catchError(error => {
          console.error('Error al actualizar el usuario:', error);
          return of('');
        }),
        map(response => {
          // Al actualizar una categoría, actualiza la lista de categorías
          this.getUsersApi(token).subscribe();
          return response;
        })
      );
  }


  deleteUserApi(id: number,token:string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete<boolean>(`${this.baseUrl}/users/delete/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar el usuario:', error);
          return of(false);
        }),
        map(response => {
          // Al eliminar una categoría, actualiza la lista de categorías
          this.getUsersApi(token).subscribe();
          return response;
        })
      );
  }

  addUserApiRegister(usuario: UsuarioApi): Observable<string> {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<string>(`${this.baseUrl}/users/add`, usuario)
      .pipe(
        catchError(error => {
          console.error('Error al agregar el usuario:', error);
          return of('');
        }),
        map(response => {
          // Al agregar una categoría, actualiza la lista de categorías
          // this.getUsersApi(token).subscribe();
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
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<string>(`${this.baseUrl}/registros/add`,registro)
  }

  getRegistroApi(): Observable<RegistroApi[]> {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
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
