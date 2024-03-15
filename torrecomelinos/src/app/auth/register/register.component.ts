import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthJsonService } from '../../services/authJson.service';
import * as CryptoJS from 'crypto-js';
import { v4 as uuid} from 'uuid';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router: Router, private authJsonService: AuthJsonService){}

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
      console.log('No hay suficientes datos para registrar al usuario.');
      return;
    }

    this.authJsonService.login(this.email, this.pass).subscribe(verificaUsuario => {
      const exiteUsuario = verificaUsuario[0];

      if (exiteUsuario != undefined){
        console.log('El usuario ya existe.');
        return;
      }

      const usuarioARegistrar: Usuario = {
        id: 4,
        email: this.email,
        pass: this.calcularHashMD5(this.pass),
        nombreCompleto: this.nombreCompleto,
        idRol: 2,
        token: uuid()
      };
      // this.usuarioRegistro.id = Math.floor(Math.random() * (9999 - 100 + 1)) + 100;

      this.authJsonService.addUser(usuarioARegistrar).subscribe(usuario => {
        const registroOk = usuario;
        console.log(registroOk);
        console.log('Usuario registrado correctamente.');
        this.router.navigate(['auth/login']);

      });
    });




  }

}
