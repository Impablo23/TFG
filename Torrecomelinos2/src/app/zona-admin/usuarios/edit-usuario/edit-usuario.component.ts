import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthJsonService } from 'src/app/services/authJson.service';
import * as CryptoJS from 'crypto-js';
import { AuthApiService } from 'src/app/services/authApi.service';
import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';
import { Rol } from 'src/app/interfaces/rol.interface';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent {

  constructor(private router: Router,
    private authJsonService: AuthJsonService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private authApi: AuthApiService
  ){}

  // public usuarioRegistro!: Usuario;
  nombreCompleto: string ='';
  email: string ='';
  pass: string ='';
  idRol: number = 0;

  public usuarioSeleccionado! : UsuarioApi ;
  public listadoRoles: Rol[] = [];

  // Función para calcular el hash MD5 de una contraseña
  calcularHashMD5(password: string): string {
    return CryptoJS.MD5(password).toString();
  }

  public cancelar() {
    this.router.navigate(['admin/usuarios'])
  }

  public verificaCampos(): boolean {
    if (this.email === '' || this.pass === '' || this.nombreCompleto === '' || this.idRol === 0) {
      return false;
    }else{
      return true;
    }
  }

  ngOnInit(): void {
    // this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.authJsonService.getUserById(id) )  ).subscribe(  usuario =>
    //   {
    //     if (!usuario) return this.router.navigate(['/usuarios']);
    //     this.usuarioSeleccionado = usuario[0];
    //     //Datos del formulario ya rellenos
    //     this.email = this.usuarioSeleccionado.email;
    //     this.nombreCompleto = this.usuarioSeleccionado.nombreCompleto;
    //     this.pass = this.usuarioSeleccionado.passwd;
    //     this.idRol = this.usuarioSeleccionado.idRol;
    //     return;
    //   });

    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.authApi.getUsersApiById(id) )  ).subscribe(  usuario =>
      {
        if (!usuario) return this.router.navigate(['/usuarios']);
        this.usuarioSeleccionado = usuario[0];
        //Datos del formulario ya rellenos
        this.email = this.usuarioSeleccionado.email;
        this.nombreCompleto = this.usuarioSeleccionado.nombreCompleto;
        this.pass = this.usuarioSeleccionado.passwd;
        this.idRol = this.usuarioSeleccionado.idRol;
        return;
      });

      this.authApi.getRoles().subscribe(
        roles => {
          this.listadoRoles = roles
        }
      );
  }


  // public editUsuario() {
  //   let usuarioEditado: Usuario;
  //   if (this.usuarioSeleccionado.passwd === this.pass){
  //     usuarioEditado = {
  //       id: this.usuarioSeleccionado.id,
  //       email: this.email,
  //       nombreCompleto:this.nombreCompleto,
  //       passwd:this.usuarioSeleccionado.passwd,
  //       token:this.usuarioSeleccionado.token,
  //       idRol:this.idRol
  //     }
  //   }else {
  //     usuarioEditado = {
  //       id: this.usuarioSeleccionado.id,
  //       email: this.email,
  //       nombreCompleto:this.nombreCompleto,
  //       passwd:this.calcularHashMD5(this.pass),
  //       token:this.usuarioSeleccionado.token,
  //       idRol:this.idRol
  //     }
  //   }

  //   this.authJsonService.updateUser(usuarioEditado).subscribe(
  //     (response) => {
  //       this.snackbar.open("Usuario actualizado correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
  //         window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
  //       });
  //     },
  //     (error) => {
  //       this.snackbar.open("Ha ocurrido un error al actualizar el usuario", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
  //         window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
  //       });
  //     }
  //   );

  // }

  public editUsuarioApi() {
    let usuarioEditado: UsuarioApi;
    if (this.usuarioSeleccionado.passwd === this.pass){
      usuarioEditado = {
        id: this.usuarioSeleccionado.id,
        email: this.email,
        nombreCompleto:this.nombreCompleto,
        passwd:this.usuarioSeleccionado.passwd,
        token:this.usuarioSeleccionado.token,
        idRol:this.idRol
      }
    }else {
      usuarioEditado = {
        id: this.usuarioSeleccionado.id,
        email: this.email,
        idRol:this.idRol,
        nombreCompleto:this.nombreCompleto,
        passwd:this.calcularHashMD5(this.pass),
        token:this.usuarioSeleccionado.token,
      }
    }

    this.authApi.updateUserApi(usuarioEditado).subscribe(
      (response) => {
        this.snackbar.open("Usuario actualizado correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
          window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
        });
      },
      (error) => {
        this.snackbar.open("Ha ocurrido un error al actualizar el usuario", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
          window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
        });
      }
    );

  }

}
