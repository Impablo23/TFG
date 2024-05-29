import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { AuthApiService } from 'src/app/services/authApi.service';

import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';


@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.css']
})
export class DeleteUsuarioComponent {

  // Variable para almacenar el email de usuario seleccionado
  public email: string = '';

  // Variable para almacenar el usuario seleccionado
  public usuarioSeleccionado!: UsuarioApi;

  public tokenApi : string = '' ;

  // Constructor
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private authApi: AuthApiService
  ){}

  /*
  Método que cuando inicie la página, se buscara el usuario con el id seleccionado para almacenar en la variable anterioir los datos y
  mostrarlos en el formulario y recoge los datos sobre los roles de la BBDD y los guarda en la lista
  */
  async ngOnInit(): Promise<void> {
    this.tokenApi = sessionStorage.getItem('tokenApi')!;

    await this.authApi.getUsersApi(this.tokenApi).toPromise();

    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.authApi.getUsersApiById(id,this.tokenApi) )  ).subscribe(  usuario =>
      {
        if (!usuario) return this.router.navigate(['/usuarios']);

        this.usuarioSeleccionado = usuario[0];
        //Datos del formulario ya rellenos
        this.email  = this.usuarioSeleccionado!.email;

        return;
      });

  }

  // Método para cancelar operacion y redirige hacia el apartado de inserccion de usuarios.
  public cancelar() {
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
    this.email = '';
    this.router.navigate(['admin/usuarios/']);
  }

  // Método que elimina el usuario de la BBDD y avisa al usuario de los que ha sucedido con un mensaje.
  public deleteUsuarioApi() {
    this.authApi.deleteUserApi(this.usuarioSeleccionado.id,this.tokenApi).subscribe(
      (response) => {
        this.snackbar.open( "Usuario eliminado correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {

        });
      },

      (error) => {
        this.snackbar.open("Ha ocurrido un error al eliminar el usuario", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {

        });
      }
    );
    this.router.navigate(['admin/usuarios/']);
  }

}
