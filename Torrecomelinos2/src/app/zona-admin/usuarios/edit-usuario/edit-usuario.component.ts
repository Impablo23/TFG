import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthJsonService } from 'src/app/services/authJson.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent {

  constructor(private router: Router,
    private authJsonService: AuthJsonService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ){}

  // public usuarioRegistro!: Usuario;
  nombreCompleto: string ='';
  email: string ='';
  pass: string ='';
  idRol: string = '';

  public usuarioSeleccionado! : Usuario ;

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

  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.authJsonService.getUserById(id) )  ).subscribe(  usuario =>
      {
        if (!usuario) return this.router.navigate(['/usuarios']);
        this.usuarioSeleccionado = usuario[0];
        //Datos del formulario ya rellenos
        this.email = this.usuarioSeleccionado.email;
        this.nombreCompleto = this.usuarioSeleccionado.nombreCompleto;
        this.pass = this.usuarioSeleccionado.pass;
        this.idRol = this.usuarioSeleccionado.idRol;
        return;
      });


  }


  public editUsuario() {
    let usuarioEditado: Usuario;
    if (this.usuarioSeleccionado.pass === this.pass){
      usuarioEditado = {
        id: this.usuarioSeleccionado.id,
        email: this.email,
        nombreCompleto:this.nombreCompleto,
        pass:this.usuarioSeleccionado.pass,
        token:this.usuarioSeleccionado.token,
        idRol:this.idRol
      }
    }else {
      usuarioEditado = {
        id: this.usuarioSeleccionado.id,
        email: this.email,
        nombreCompleto:this.nombreCompleto,
        pass:this.calcularHashMD5(this.pass),
        token:this.usuarioSeleccionado.token,
        idRol:this.idRol
      }
    }

    this.authJsonService.updateUser(usuarioEditado).subscribe(
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
