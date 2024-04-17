import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from 'crypto-js';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthApiService } from 'src/app/services/authApi.service';

import { RegistroApi } from 'src/app/interfaces/registroApi.interface';
import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent{

  // Variables del formulario de Login
  email: string = ''
  pass: string = ''

  // Constructor
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private authApi: AuthApiService
  ){}

  // Método donde le pasas un string y te devuelve el string encriptado en MD5
  calcularHashMD5(password: string): string {
    return CryptoJS.MD5(password).toString();
  }

  // Login API
  public loginApi() {

    // Verificamos que no estén los datos vacíos
    if (this.email === '' || this.pass === ''){
      this.snackbar.open("No has rellenado todos los datos requeridos", "Cerrar",{duration: 2000,panelClass:['background']});
      return;
    }

    // Llamamos al servicio que comprueba que ese correo y pass existen en la BBDD y lo almacena en una constante para
    // asignarle un nuevo token y añadir su conexion al registro de conexiones y si todo esta OK redirige a la pagina
    // principal de la aplicacion y si esta NO OK se le notifica al usuario que ingrese de nuevo las credenciales.
    this.authApi.getUserByEmailAndPass(this.email,this.calcularHashMD5(this.pass)).subscribe(
      usuario => {
        const userOk = usuario[0];

        if (userOk != undefined) {

          const userUpdate: UsuarioApi = {
            id: userOk.id,
            email: userOk.email,
            passwd: userOk.passwd,
            nombreCompleto: userOk.nombreCompleto,
            idRol: userOk.idRol,
            token: uuidv4()
          }

          this.authApi.updateUserApi(userUpdate).subscribe(
            respuesta => {

              localStorage.setItem('id', (userUpdate.id).toString());
              localStorage.setItem('email', userUpdate.email);
              localStorage.setItem('nombreCompleto', userUpdate.nombreCompleto);
              localStorage.setItem('idRol', (userUpdate.idRol).toString());
              localStorage.setItem('token', userUpdate.token);

              const registroNow: RegistroApi = {
                id: 0,
                id_usuario: userOk.id,
                estado: 'Conectado'
              }

              this.authApi.addRegistroApi(registroNow).subscribe(
                respuesta => {
                  this.snackbar.open("Inicio de Sesión Correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
                }
              );
              this.router.navigate(['/establecimientos'])
            }
          );
        }else {
          this.email = '';
          this.pass = '';
          this.snackbar.open("Inicio de Sesión Incorrecto", "Cerrar",{duration: 2000,panelClass:['background']});
        }

      }
    );
  }

}
