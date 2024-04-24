import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthApiService } from 'src/app/services/authApi.service';

import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  // Constructor
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private authApi: AuthApiService
  ){}

  // Variables del formulario de Register
  nombreCompleto: string ='';
  email: string ='';
  pass: string ='';

  public token: string = '';


  // Método para redirigir hacia el Login
  public navigateToLogin() :void {
    this.router.navigate(['/auth']);
  }

 // Método donde le pasas un string y te devuelve el string encriptado en MD5
  calcularHashMD5(password: string): string {
    return CryptoJS.MD5(password).toString();
  }

  /*
    Método para registrar usuario en comprueba de que el email no exista en la BBDD y que estén todos los campos rellenos y si eso esta OK
    procede a añadir el usuario a la BBDD dándole los valores que ha introducido el usuario mas el idRol = 2 y el token vacío y si está NO OK
    le notifica que el usuario está ya registrado
  */
  public async registrarApi(): Promise<void> {

    // Verificamos que no estén los datos vacíos
    if (this.email === '' || this.pass === '' || this.nombreCompleto === '') {
      this.snackbar.open("No has rellenado todos los datos requeridos", "Cerrar", { duration: 2000, panelClass: ['background'] });
      return;
    }

    if (!this.email.includes('@gmail.com') && !this.email.includes('@hotmail.com')) {
      this.snackbar.open("No has introducido un correo electrónico válido", "Cerrar", { duration: 2000, panelClass: ['background'] });
      return;
    }

    if (this.nombreCompleto.length<5){
      this.snackbar.open("El nombre debe tener un mínimo de 5 caracteres", "Cerrar", { duration: 2000, panelClass: ['background'] });
      return;
    }

    if (this.pass.length < 8) {
      this.snackbar.open("La contraseña debe tener un mínimo de 8 caracteres", "Cerrar", { duration: 2000, panelClass: ['background'] });
      return;
    }

    this.authApi.getUserByEmail(this.email).subscribe(
      usuario => {
        const userOk = usuario[0];

        if (userOk != undefined) {
          this.snackbar.open("El usuario registrado ya existe", "Cerrar", { duration: 2000, panelClass: ['background'] });
          return;
        }else{

          const nuevoUser: UsuarioApi = {
            id: 0,
            email: this.email,
            passwd: this.calcularHashMD5(this.pass),
            nombreCompleto: this.nombreCompleto,
            idRol: 2,
            token: ''
          }


          this.authApi.addUserApiRegister(nuevoUser).subscribe(
            repuesta => {
              this.snackbar.open("Usuario registrado correctamente", "Cerrar", { duration: 2000, panelClass: ['background'] });
              this.router.navigate(['/auth']);
            }
          );
        }


      }
    );


  }



}


