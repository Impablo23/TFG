import { Injectable } from "@angular/core";
import { environments } from "environments/environments";
import { HttpClient } from '@angular/common/http';
import { Usuario } from "../interfaces/usuario.interface";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthJsonService {

  private baseUrl: string = environments.baseUrl
  private usuario?: Usuario;

  constructor(private http: HttpClient) { }

  get usuarioActual(): Usuario | undefined {
    if (!this.usuario) return undefined;

    return structuredClone(this.usuario);
  }

  login (email: string, password: string): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(`${this.baseUrl}/users?email=${email}&pass=${password}`).pipe(
      tap( usuario => this.usuario = usuario[0])
    );

  }

  logout() {
    this.usuario = undefined;
    localStorage.clear();
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/users`)
  }

  addUser(usuario:Usuario): Observable<Usuario>  {
    return this.http.post<Usuario>(`${this.baseUrl}/users`,usuario)
  }




}
