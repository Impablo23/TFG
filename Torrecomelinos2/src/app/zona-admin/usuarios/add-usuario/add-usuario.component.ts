import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthJsonService } from 'src/app/services/authJson.service';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent {

  constructor(private router: Router, private authJsonService: AuthJsonService,private snackbar: MatSnackBar){}

  // public usuarioRegistro!: Usuario;
  nombreCompleto: string ='';
  email: string ='';
  pass: string ='';
  idRol: string = '';

  // Función para calcular el hash MD5 de una contraseña
  calcularHashMD5(password: string): string {
    return CryptoJS.MD5(password).toString();
  }

  public cancelar() {
    this.email = '';
    this.nombreCompleto = '';
    this.pass = '';
    this.idRol = '';
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
  }

  public verificaCampos(): boolean {
    if (this.email === '' || this.pass === '' || this.nombreCompleto === '' || this.idRol === '') {
      return false;
    }else{
      return true;
    }
  }

  registrar() :void {

    this.authJsonService.verificaCorreo(this.email).subscribe(verificaCorreo => {
      const correo = verificaCorreo[0];
      console.log(correo);
      if (correo != undefined) {
        this.snackbar.open("El usuario registrado ya existe", "Cerrar",{duration: 2000,panelClass:['background']});
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
          id: (12).toString(),
          email: this.email,
          pass: this.calcularHashMD5(this.pass),
          nombreCompleto: this.nombreCompleto,
          idRol: this.idRol,
          token: uuidv4()
        };
        // this.usuarioRegistro.id = Math.floor(Math.random() * (9999 - 100 + 1)) + 100;

        this.authJsonService.addUser(usuarioARegistrar).subscribe(usuario => {
          const registroOk = usuario;
          console.log(registroOk);
          this.snackbar.open("Usuario registrado correctamente", "Cerrar",{duration: 2000,panelClass:['background']});

          this.email = '';
          this.nombreCompleto = '';
          this.pass = '';
          this.idRol = '';

          window.location.reload();

        });
      });
    })


  }

}


