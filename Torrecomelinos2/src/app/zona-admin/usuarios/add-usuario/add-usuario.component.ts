import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthJsonService } from 'src/app/services/authJson.service';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from 'crypto-js';
import { AuthApiService } from 'src/app/services/authApi.service';
import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent {

  constructor(private router: Router, private authJsonService: AuthJsonService,private snackbar: MatSnackBar, private authApi: AuthApiService){}

  // public usuarioRegistro!: Usuario;
  nombreCompleto: string ='';
  email: string ='';
  pass: string ='';
  idRol: number = 0;

  // Función para calcular el hash MD5 de una contraseña
  calcularHashMD5(password: string): string {
    return CryptoJS.MD5(password).toString();
  }

  public cancelar() {
    this.email = '';
    this.nombreCompleto = '';
    this.pass = '';
    this.idRol = 0;
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
  }

  public verificaCampos(): boolean {
    if (this.email === '' || this.pass === '' || this.nombreCompleto === '' || this.idRol === 0) {
      return false;
    }else{
      return true;
    }
  }

  // public registrar(): void {
  //   // if (this.email === '' || this.pass === '' || this.nombreCompleto === '') {
  //   //     this.snackbar.open("No has rellenado todos los datos requeridos", "Cerrar", { duration: 2000, panelClass: ['background'] });
  //   //     return;
  //   // }

  //   this.authJsonService.verificaCorreo(this.email).subscribe(verificaCorreo => {
  //       const correo = verificaCorreo[0];
  //       console.log(correo);
  //       if (correo != undefined) {
  //           this.snackbar.open("El usuario registrado ya existe", "Cerrar", { duration: 2000, panelClass: ['background'] });
  //           return;
  //       }

  //       this.authJsonService.login(this.email, this.calcularHashMD5(this.pass)).subscribe(verificaUsuario => {
  //           const exiteUsuario = verificaUsuario[0];
  //           if (exiteUsuario != undefined) {
  //               this.snackbar.open("El usuario registrado ya existe", "Cerrar", { duration: 2000, panelClass: ['background'] });
  //               return;
  //           }

  //           this.authJsonService.getUsers().subscribe(usuarios => {
  //               // Encontrar el máximo ID actual
  //               let maxId = 0;
  //               usuarios.forEach(usuario => {
  //                   const idNum = parseInt(usuario.id);
  //                   if (idNum > maxId) {
  //                       maxId = idNum;
  //                   }
  //               });

  //               // Generar el nuevo ID sumando 1 al máximo ID encontrado
  //               const nuevoId = (maxId + 1).toString();

  //               // Crear el nuevo usuario con el nuevo ID
  //               const usuarioARegistrar: Usuario = {
  //                   id: nuevoId,
  //                   email: this.email,
  //                   passwd: this.calcularHashMD5(this.pass),
  //                   nombreCompleto: this.nombreCompleto,
  //                   idRol: this.idRol,
  //                   token: uuidv4()
  //               };

  //               this.authJsonService.addUser(usuarioARegistrar).subscribe(usuario => {
  //                   const registroOk = usuario;
  //                   this.snackbar.open( "Usuario añadido correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
  //                     window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
  //                   });
  //               });
  //           });
  //       });
  //   });
  // }


  // Register API
  public registrarApi(): void {

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
                window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
              });
            }
          );
        }


      }
    );


  }

}


