import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import * as crypto from 'crypto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router: Router){}

  public usuarioRegistro!: Usuario;
  nombreCompleto: string ='';
  email: string ='';
  pass: string ='';


  public navigateToLogin() :void {
    this.router.navigate(['auth/login']);
  }

  encryptPasswordToMD5(password: string): string {
    // Crea un hash MD5 con la contraseña proporcionada
    const hash = crypto.createHash('md5').update(password).digest('hex');
    return hash;
  }

  registrar() :void {

    this.usuarioRegistro.email = this.email;
    this.usuarioRegistro.nombreCompleto = this.nombreCompleto;
    this.usuarioRegistro.pass = this.encryptPasswordToMD5(this.pass);
    this.usuarioRegistro.idRol = 2;
    this.usuarioRegistro.token = "bsyfgyeiwgfy4gwfy";
    this.usuarioRegistro.id = Math.floor(Math.random() * (9999 - 100 + 1)) + 100;



  }

}
