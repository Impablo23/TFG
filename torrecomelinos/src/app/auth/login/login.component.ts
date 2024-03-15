import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthJsonService } from 'src/app/services/authJson.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = ''
  pass: string = ''
  // public usuarioOK!: Usuario

  listadoUsers: Usuario[] = [];

  constructor(private router: Router, private authJsonService: AuthJsonService){}

  public navigateToRegister() :void {
    this.router.navigate(['auth/register']);
  }

  public login() :void {

    // Llama a tu servicio de autenticación para realizar el inicio de sesión
    this.authJsonService.login(this.email, this.pass).subscribe(usuario => {
      const usuarioOK = usuario[0];
      // console.log(usuarioOK);

      if (this.email === '' || this.pass === ''){
        console.log('No están todos los campos rellenados.');
        return;
      }

      if (usuarioOK != undefined) {
        console.log('Inicio de Sesión correcto.');
        localStorage.setItem('id', (usuarioOK.id).toString());
        localStorage.setItem('email', usuarioOK.email);
        localStorage.setItem('nombreCompleto', usuarioOK.nombreCompleto);
        localStorage.setItem('idRol', (usuarioOK.idRol).toString());
        localStorage.setItem('token', usuarioOK.token);
        // this.router.navigate
      }else {
        console.log('Error.');
      }


    });



  }


}
