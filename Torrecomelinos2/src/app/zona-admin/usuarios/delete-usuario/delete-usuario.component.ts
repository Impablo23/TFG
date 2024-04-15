import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';
import { AuthApiService } from 'src/app/services/authApi.service';
import { AuthJsonService } from 'src/app/services/authJson.service';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.css']
})
export class DeleteUsuarioComponent {

  public email: string = '';

  public usuarioSeleccionado!: UsuarioApi;

  constructor(
    private authJsonService: AuthJsonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private authApi: AuthApiService
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.authApi.getUsersApiById(id) )  ).subscribe(  usuario =>
      {
        if (!usuario) return this.router.navigate(['/usuarios']);

        this.usuarioSeleccionado = usuario[0];
        //Datos del formulario ya rellenos
        this.email  = this.usuarioSeleccionado!.email;

        return;
      });


  }

  public cancelar() {
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
    this.email = '';
    this.router.navigate(['admin/usuarios/']);
  }

  // public deleteUsuario() {
  //   this.authJsonService.deleteUser(this.usuarioSeleccionado.id).subscribe(
  //     (response) => {
  //       this.snackbar.open( "Usuario eliminado correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
  //         window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
  //       });
  //     },

  //     (error) => {
  //       this.snackbar.open("Ha ocurrido un error al eliminar el usuario", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
  //         window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
  //       });
  //     }
  //   );
  //   this.router.navigate(['admin/usuarios/']);
  // }

  public deleteUsuarioApi() {
    this.authApi.deleteUserApi(this.usuarioSeleccionado.id).subscribe(
      (response) => {
        this.snackbar.open( "Usuario eliminado correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
          window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
        });
      },

      (error) => {
        this.snackbar.open("Ha ocurrido un error al eliminar el usuario", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
          window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
        });
      }
    );
    this.router.navigate(['admin/usuarios/']);
  }

}
