import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthJsonService } from 'src/app/services/authJson.service';
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

  email: string = ''
  pass: string = ''
  // public usuarioOK!: Usuario

  listadoUsers: Usuario[] = [];

  constructor(
    private router: Router,
    // private authJsonService: AuthJsonService,
    private snackbar: MatSnackBar,
    private authApi: AuthApiService
  ){}

  calcularHashMD5(password: string): string {
    return CryptoJS.MD5(password).toString();
  }

  // Login JSON
  // public login() :void {

  //   // Llama a tu servicio de autenticación para realizar el inicio de sesión
  //   this.authJsonService.login(this.email, this.calcularHashMD5(this.pass)).subscribe(usuario => {
  //     const usuarioOK = usuario[0];

  //     if (this.email === '' || this.pass === ''){
  //       this.snackbar.open("No has rellenado todos los datos requeridos", "Cerrar",{duration: 2000,panelClass:['background']});
  //       return;
  //     }

  //     if (usuarioOK != undefined) {
  //       // console.log('Inicio de Sesión correcto.');
  //       localStorage.setItem('id', (usuarioOK.id).toString());
  //       localStorage.setItem('email', usuarioOK.email);
  //       localStorage.setItem('nombreCompleto', usuarioOK.nombreCompleto);
  //       localStorage.setItem('idRol', (usuarioOK.idRol).toString());
  //       localStorage.setItem('token', usuarioOK.token);
  //       this.snackbar.open("Inicio de Sesión Correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
  //       this.router.navigate(['/establecimientos'])
  //     }else {
  //       this.email = '';
  //       this.pass = '';
  //       this.snackbar.open("Inicio de Sesión Incorrecto", "Cerrar",{duration: 2000,panelClass:['background']});
  //     }


  //   });
  // }


  // Login API
  public loginApi() {

    if (this.email === '' || this.pass === ''){
      this.snackbar.open("No has rellenado todos los datos requeridos", "Cerrar",{duration: 2000,panelClass:['background']});
      return;
    }

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

              // console.log('Inicio de Sesión correcto.');
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
