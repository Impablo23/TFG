import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthJsonService } from 'src/app/services/authJson.service';
import { v4 as uuidv4 } from 'uuid';
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

  constructor(private router: Router, private authJsonService: AuthJsonService,private snackbar: MatSnackBar,private authApi: AuthApiService){}

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

  // Register JSON
  public registrar(): void {
    if (this.email === '' || this.pass === '' || this.nombreCompleto === '') {
        this.snackbar.open("No has rellenado todos los datos requeridos", "Cerrar", { duration: 2000, panelClass: ['background'] });
        return;
    }

    this.authJsonService.verificaCorreo(this.email).subscribe(verificaCorreo => {
        const correo = verificaCorreo[0];
        console.log(correo);
        if (correo != undefined) {
            this.snackbar.open("El usuario registrado ya existe", "Cerrar", { duration: 2000, panelClass: ['background'] });
            return;
        }

        this.authJsonService.login(this.email, this.calcularHashMD5(this.pass)).subscribe(verificaUsuario => {
            const exiteUsuario = verificaUsuario[0];
            if (exiteUsuario != undefined) {
                this.snackbar.open("El usuario registrado ya existe", "Cerrar", { duration: 2000, panelClass: ['background'] });
                return;
            }

            this.authJsonService.getUsers().subscribe(usuarios => {
                // Encontrar el máximo ID actual
                let maxId = 0;
                usuarios.forEach(usuario => {
                    const idNum = parseInt(usuario.id);
                    if (idNum > maxId) {
                        maxId = idNum;
                    }
                });

                // Generar el nuevo ID sumando 1 al máximo ID encontrado
                const nuevoId = (maxId + 1).toString();

                // Crear el nuevo usuario con el nuevo ID
                const usuarioARegistrar: Usuario = {
                    id: nuevoId,
                    email: this.email,
                    passwd: this.calcularHashMD5(this.pass),
                    nombreCompleto: this.nombreCompleto,
                    idRol: '2',
                    token: uuidv4()
                };

                this.authJsonService.addUser(usuarioARegistrar).subscribe(usuario => {
                    const registroOk = usuario;
                    this.snackbar.open("Usuario registrado correctamente", "Cerrar", { duration: 2000, panelClass: ['background'] });
                    this.router.navigate(['auth/login']);
                });
            });
        });
    });
  }

  // Register API
  public registrarApi(): void {

    if (this.email === '' || this.pass === '' || this.nombreCompleto === '') {
        this.snackbar.open("No has rellenado todos los datos requeridos", "Cerrar", { duration: 2000, panelClass: ['background'] });
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
            token: uuidv4()
          }


          this.authApi.addUserApi(nuevoUser).subscribe(
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


