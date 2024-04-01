import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthJsonService } from 'src/app/services/authJson.service';
import * as CryptoJS from 'crypto-js';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  email: string = ''
  pass: string = ''
  // public usuarioOK!: Usuario

  listadoUsers: Usuario[] = [];

  constructor(private router: Router, private authJsonService: AuthJsonService,private snackbar: MatSnackBar){}

  calcularHashMD5(password: string): string {
    return CryptoJS.MD5(password).toString();
  }

  public login() :void {

    // Llama a tu servicio de autenticación para realizar el inicio de sesión
    this.authJsonService.login(this.email, this.calcularHashMD5(this.pass)).subscribe(usuario => {
      const usuarioOK = usuario[0];
      // console.log(usuarioOK);

      if (this.email === '' || this.pass === ''){
        this.snackbar.open("No has rellenado todos los datos requeridos", "Cerrar",{duration: 2000,panelClass:['background']});
        // console.log('No están todos los campos rellenados.');
        return;
      }

      if (usuarioOK != undefined) {
        // console.log('Inicio de Sesión correcto.');
        localStorage.setItem('id', (usuarioOK.id).toString());
        localStorage.setItem('email', usuarioOK.email);
        localStorage.setItem('nombreCompleto', usuarioOK.nombreCompleto);
        localStorage.setItem('idRol', (usuarioOK.idRol).toString());
        localStorage.setItem('token', usuarioOK.token);
        this.snackbar.open("Inicio de Sesión Correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
        this.router.navigate(['/establecimientos'])
      }else {
        this.email = '';
        this.pass = '';
        this.snackbar.open("Inicio de Sesión Incorrecto", "Cerrar",{duration: 2000,panelClass:['background']});
      }


    });



  }

}
