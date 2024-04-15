import { Injectable } from "@angular/core";
import { environments, environmentsApi } from "environments/environments";
import { HttpClient } from '@angular/common/http';
import { Usuario } from "../interfaces/usuario.interface";
import { Observable, catchError, map, of, tap } from "rxjs";
import { Respuesta } from "../interfaces/respuesta.interface copy";
import { UsuarioApi } from "../interfaces/usuarioApi.interface";
import { Rol } from "../interfaces/rol.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private baseUrl: string = environmentsApi.baseUrl

  constructor(private http: HttpClient) { }

  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------USUARIOS-----------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  // getUsers(): Observable<Usuario[]> {
  //   return this.http.get<Usuario[]>(`${this.baseUrl}/users`)
  // }

  // addUser(usuario:Usuario): Observable<Usuario>  {
  //   return this.http.post<Usuario>(`${this.baseUrl}/users`,usuario)
  // }

  // getUserById(id: string): Observable<Usuario[]> {
  //   return this.http.get<Usuario[]>(`${this.baseUrl}/users?id=${id}`)
  // }

  // updateUser(usuario : Usuario): Observable<boolean> {
  //   return this.http.patch<Usuario>(`${ this.baseUrl }/users/${ usuario.id }`, usuario).pipe(map( response => true),catchError(error => of(false)))
  // }


  // deleteUser(id: string): Observable<boolean> {
  //   return this.http.delete(`${ this.baseUrl }/users/${id}`).pipe(map( response => true),catchError(error => of(false)))
  // }

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.baseUrl}/roles`)
  }

  getUsersApi(): Observable<UsuarioApi[]> {
    return this.http.get<UsuarioApi[]>(`${this.baseUrl}/users`)
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

  addUserApi(usuario: UsuarioApi): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/users/add`,usuario)
  }

  updateUserApi(usuario : UsuarioApi): Observable<string> {
    return this.http.put<string>(`${ this.baseUrl }/users/edit`, usuario)
  }

  deleteUserApi(id : number): Observable<boolean> {
    return this.http.delete<boolean>(`${ this.baseUrl }/users/delete/${id}`).pipe(map( response => true),catchError(error => of(false)))
  }






}
