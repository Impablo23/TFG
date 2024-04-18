import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';

import { AuthApiService } from 'src/app/services/authApi.service';

import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent {

  // Constructor
  constructor(
    private snackbar: MatSnackBar,
    private authApi: AuthApiService,
    private router: Router,
  ){}

  // Variables del formulario de Register
  nombreCompleto: string ='';
  email: string ='';
  pass: string ='';
  idRol: number = 0;

  // Función para calcular el hash MD5 de una contraseña
  calcularHashMD5(password: string): string {
    return CryptoJS.MD5(password).toString();
  }

  // Método que cancela la inserccion borrando los datos del formulario y notificando al usuario de lo sucedido.
  public cancelar() {
    this.email = '';
    this.nombreCompleto = '';
    this.pass = '';
    this.idRol = 0;
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
  }

  // Método que dependiendo de si comple las condiciones se mostrara el botón de aceptar o no el proceso.
  public verificaCampos(): boolean {
    if (this.email === '' || this.pass === '' || this.nombreCompleto === '' || this.idRol === 0) {
      return false;
    }else{
      return true;
    }
  }

  /*
    Método para registrar usuario en comprueba de que el email no exista en la BBDD y que estén todos los campos rellenos y si eso esta OK
    procede a añadir el usuario a la BBDD dándole los valores que ha introducido el usuario mas el idRol = 2 y el token vacío y si está NO OK
    le notifica que el usuario está ya registrado
  */
  public registrarApi(): void {

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


          this.authApi.addUserApi(nuevoUser).subscribe(
            repuesta => {
              this.snackbar.open( "Usuario añadido correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
              });
            }
          );
          this.router.navigate(['admin/usuarios/']);
        }


      }
    );


  }

}


