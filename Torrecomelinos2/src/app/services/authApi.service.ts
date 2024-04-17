import { Injectable } from "@angular/core";
import { environmentsApi } from "environments/environments";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from "rxjs";

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

  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //---------------------------------------------REGISTRO-----------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  addRegistroApi(registro: RegistroApi): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/registros/add`,registro)
  }



}
