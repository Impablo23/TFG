import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthJsonService } from 'src/app/services/authJson.service';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from 'crypto-js';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  constructor(private router: Router, private authJsonService: AuthJsonService,private snackbar: MatSnackBar){}

  // public usuarioRegistro!: Usuario;
  nombreCompleto: string ='';
  email: string ='';
  pass: string ='';


  public navigateToLogin() :void {
    this.router.navigate(['auth/login']);
  }

    // Función para calcular el hash MD5 de una contraseña
  calcularHashMD5(password: string): string {
    return CryptoJS.MD5(password).toString();
  }


  registrar() :void {

    if (this.email === '' || this.pass === '' || this.nombreCompleto === '') {
      this.snackbar.open("No has rellenado todos los datos requeridos", "Cerrar",{duration: 2000,panelClass:['background']});
      return;
    }

    this.authJsonService.login(this.email, this.calcularHashMD5(this.pass)).subscribe(verificaUsuario => {

      // console.log(this.email+" "+this.pass)

      const exiteUsuario = verificaUsuario[0];
      // console.log(exiteUsuario);

      if (exiteUsuario != undefined){
        this.snackbar.open("El usuario registrado ya existe", "Cerrar",{duration: 2000,panelClass:['background']});
        return;
      }

      const usuarioARegistrar: Usuario = {
        id: 4,
        email: this.email,
        pass: this.calcularHashMD5(this.pass),
        nombreCompleto: this.nombreCompleto,
        idRol: 2,
        token: uuidv4()
      };
      // this.usuarioRegistro.id = Math.floor(Math.random() * (9999 - 100 + 1)) + 100;

      this.authJsonService.addUser(usuarioARegistrar).subscribe(usuario => {
        const registroOk = usuario;
        // console.log(registroOk);
        this.snackbar.open("Usuario registrado correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
        this.router.navigate(['auth/login']);

      });
    });

  }

}


