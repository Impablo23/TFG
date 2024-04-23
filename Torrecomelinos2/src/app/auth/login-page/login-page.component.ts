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
export class LoginPageComponent{

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

  // Método donde le pasas un string y te devuelve el string encriptado en MD5
  calcularHashMD5(password: string): string {
    return CryptoJS.MD5(password).toString();
  }

  // // Login API
  // public loginApi() {

  //   // Verificamos que no estén los datos vacíos
  //   if (this.email === '' || this.pass === ''){
  //     this.snackbar.open("No has rellenado todos los datos requeridos", "Cerrar",{duration: 2000,panelClass:['background']});
  //     return;
  //   }


  //   // Llamamos al servicio que comprueba que ese correo y pass existen en la BBDD y lo almacena en una constante para
  //   // asignarle un nuevo token y añadir su conexion al registro de conexiones y si todo esta OK redirige a la pagina
  //   // principal de la aplicacion y si esta NO OK se le notifica al usuario que ingrese de nuevo las credenciales.
  //   this.authApi.getUserByEmailAndPass(this.email,this.calcularHashMD5(this.pass)).subscribe(
  //     usuario => {
  //       const userOk = usuario[0];



  //       if (userOk != undefined) {

  //         const userUpdate: UsuarioApi = {
  //           id: userOk.id,
  //           email: userOk.email,
  //           passwd: userOk.passwd,
  //           nombreCompleto: userOk.nombreCompleto,
  //           idRol: userOk.idRol,
  //           token: uuidv4()
  //         }

  //         this.authApi.updateUserApi(userUpdate,this.token).subscribe(
  //           respuesta => {

  //             localStorage.setItem('id', (userUpdate.id).toString());
  //             localStorage.setItem('email', userUpdate.email);
  //             localStorage.setItem('nombreCompleto', userUpdate.nombreCompleto);
  //             localStorage.setItem('idRol', (userUpdate.idRol).toString());
  //             localStorage.setItem('token', userUpdate.token);

  //             const registroNow: RegistroApi = {
  //               id: 0,
  //               id_usuario: userOk.id,
  //               estado: 'Conectado',
  //               hora: this.authApi.obtenerFechaYHora(new Date().toISOString()),
  //             }

  //             this.authApi.addRegistroApi(registroNow).subscribe(
  //               respuesta => {
  //                 this.snackbar.open("Inicio de Sesión Correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
  //               }
  //             );

  //             this.authApi.getToken(userOk.email,userOk.passwd).subscribe(
  //               (response) => {
  //                 // La solicitud se completó con éxito
  //                 this.token = response.access_token;
  //                 localStorage.setItem('tokenApi', this.token);
  //                 console.log('Inicio de sesión exitoso');
  //                 // Aquí puedes realizar cualquier acción adicional que necesites
  //               },
  //               error => {
  //                 // Ocurrió un error durante la solicitud
  //                 console.error('Error en el inicio de sesión:', error);
  //                 // Aquí puedes manejar el error de acuerdo a tus necesidades
  //               }
  //             );

  //             this.router.navigate(['/establecimientos'])
  //           }
  //         );
  //       }else {
  //         this.email = '';
  //         this.pass = '';
  //         this.snackbar.open("Inicio de Sesión Incorrecto", "Cerrar",{duration: 2000,panelClass:['background']});
  //       }

  //     }
  //   );
  // }



  // public async loginApi() {
  //   if (this.email === '' || this.pass === ''){
  //     this.snackbar.open("No has rellenado todos los datos requeridos", "Cerrar",{duration: 2000,panelClass:['background']});
  //     return;
  //   }

  //   try {
  //     const usuario = await this.authApi.getUserByEmailAndPass(this.email, this.calcularHashMD5(this.pass)).toPromise();
  //     const userOk = usuario![0];

  //     if (userOk != undefined) {
  //       const userUpdate: UsuarioApi = {
  //         id: userOk.id,
  //         email: userOk.email,
  //         passwd: userOk.passwd,
  //         nombreCompleto: userOk.nombreCompleto,
  //         idRol: userOk.idRol,
  //         token: uuidv4()
  //       }

  //       const registroLogin: RegistroApi = {
  //         id: 0,
  //         id_usuario: userUpdate.id,
  //         estado: 'Conectado',
  //         hora: this.authApi.obtenerFechaYHora(new Date().toISOString()),
  //       }

  //       // Obtener token API
  //       const response = await this.authApi.getToken(userOk.email, this.pass).toPromise();
  //       this.token = response.access_token;
  //       localStorage.setItem('tokenApi', this.token);

  //       await this.authApi.addRegistroApi(registroLogin).toPromise();

  //       // Actualizar usuario
  //       await this.authApi.updateUserApi(userUpdate, this.token).toPromise();
  //       await delay(2000);


  //       // Almacenar datos de usuario en el localStorage
  //       localStorage.setItem('id', userUpdate.id.toString());
  //       localStorage.setItem('email', userUpdate.email);
  //       localStorage.setItem('nombreCompleto', userUpdate.nombreCompleto);
  //       localStorage.setItem('idRol', userUpdate.idRol.toString());
  //       localStorage.setItem('token', userUpdate.token);





  //       // console.log('Inicio de sesión exitoso');
  //       this.snackbar.open("Inicio de Sesión Correcto", "Cerrar",{duration: 2000,panelClass:['background']});
  //       this.router.navigate(['/establecimientos']);
  //     } else {
  //       this.email = '';
  //       this.pass = '';
  //       this.snackbar.open("Inicio de Sesión Incorrecto", "Cerrar",{duration: 2000,panelClass:['background']});
  //     }
  //   } catch (error) {
  //     console.error('Error en el inicio de sesión:', error);
  //     // Maneja el error según sea necesario
  //   }
  // }


  public async loginApi() {
    if (this.email === '' || this.pass === ''){
      this.snackbar.open("No has rellenado todos los datos requeridos", "Cerrar",{duration: 2000,panelClass:['background']});
      return;
    }

    try {
      const usuario = await this.authApi.getUserByEmailAndPass(this.email, this.calcularHashMD5(this.pass)).toPromise();
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

        const registroLogin: RegistroApi = {
          id: 0,
          id_usuario: userUpdate.id,
          estado: 'Conectado',
          hora: this.authApi.obtenerFechaYHora(new Date().toISOString()),
        }

        // Obtener token API
        const response = await this.authApi.getToken(userOk.email, this.pass).toPromise();
        this.token = response.access_token;
        localStorage.setItem('tokenApi', this.token);

        await this.authApi.addRegistroApi(registroLogin).toPromise();

        // Actualizar usuario y obtener usuarios después de la actualización
        await this.authApi.updateUserApi(userUpdate, this.token)
          .pipe(
            concatMap(() => this.authApi.getUsersApi(this.token))
          )
        .toPromise();

        // Almacenar datos de usuario en el localStorage
        localStorage.setItem('id', userUpdate.id.toString());
        localStorage.setItem('email', userUpdate.email);
        localStorage.setItem('nombreCompleto', userUpdate.nombreCompleto);
        localStorage.setItem('idRol', userUpdate.idRol.toString());
        localStorage.setItem('token', userUpdate.token);

        // console.log('Inicio de sesión exitoso');
        this.snackbar.open("Inicio de Sesión Correcto", "Cerrar",{duration: 2000,panelClass:['background']});
        this.router.navigate(['/establecimientos']);
      } else {
        this.email = '';
        this.pass = '';
        this.snackbar.open("Inicio de Sesión Incorrecto", "Cerrar",{duration: 2000,panelClass:['background']});
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      // Maneja el error según sea necesario
    }
  }


}
