import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from 'crypto-js';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthApiService } from 'src/app/services/authApi.service';

import { RegistroApi } from 'src/app/interfaces/registroApi.interface';
import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';
import { concatMap, delay, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  // Variables del formulario de Login
  email: string = ''
  pass: string = ''

  public token: string = '';

  // Constructor
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private authApi: AuthApiService
  ){}
  ngOnInit(): void {

  }

  // Método donde le pasas un string y te devuelve el string encriptado en MD5
  calcularHashMD5(password: string): string {
    return CryptoJS.MD5(password).toString();
  }

  // Login API
  public async loginApi() {

    if (this.email === '' || this.pass === ''){
      this.snackbar.open("No has rellenado todos los datos requeridos", "Cerrar",{duration: 2000,panelClass:['background']});
      return;
    }

    try {

      // Obtener token API solo si el usuario es válido
      const response = await this.authApi.getToken(this.email, this.pass).toPromise();
      this.token = response.access_token;

      const usuario = await this.authApi.getUserByEmailAndPass(this.email, this.calcularHashMD5(this.pass),this.token).toPromise();
      const userOk = usuario![0];

      if (userOk != undefined) {

        const userUpdate: UsuarioApi = {
          id: userOk.id,
          email: userOk.email,
          passwd: userOk.passwd,
          nombreCompleto: userOk.nombreCompleto,
          idRol: userOk.idRol,
          token: uuidv4()
        }

        await this.authApi.updateUser(userUpdate, this.token).toPromise();

        const registroLogin: RegistroApi = {
          id: 0,
          id_usuario: userUpdate.id,
          estado: 'Conectado',
          hora: this.authApi.obtenerFechaYHora(new Date().toISOString()),
        }

        await this.authApi.addRegistroApi(registroLogin,this.token).toPromise();

        // Actualizar usuario y obtener usuarios después de la actualización

        // Almacenar datos de usuario en el sessionStorage
        sessionStorage.setItem('id', userUpdate.id.toString());
        sessionStorage.setItem('email', userUpdate.email);
        sessionStorage.setItem('nombreCompleto', userUpdate.nombreCompleto);
        sessionStorage.setItem('idRol', userUpdate.idRol.toString());
        sessionStorage.setItem('token', userUpdate.token);
        sessionStorage.setItem('tokenApi', this.token);

        // console.log('Inicio de sesión exitoso');
        this.snackbar.open("Inicio de Sesión Correcto", "Cerrar",{duration: 2000,panelClass:['background']});
        this.router.navigate(['/establecimientos']);
      } else {
        this.email = '';
        this.pass = '';
        this.snackbar.open("Inicio de Sesión Incorrecto", "Cerrar",{duration: 2000,panelClass:['background']});
      }
    } catch (error) {
      this.snackbar.open("Inicio de Sesión Incorrecto", "Cerrar",{duration: 2000,panelClass:['background']});
      // Maneja el error según sea necesario
    }
  }



}
