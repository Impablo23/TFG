import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { AuthApiService } from 'src/app/services/authApi.service';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { SugerenciaApi } from 'src/app/interfaces/sugerenciaApi.interface';
import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';

@Component({
  selector: 'app-delete-sugerencia',
  templateUrl: './delete-sugerencia.component.html',
  styleUrls: ['./delete-sugerencia.component.css']
})
export class DeleteSugerenciaComponent {

  // Variables para guardar el nombre  del establecimiento sugerido y el email del usuario
  public nombre: string = '';
  public usuario: string = '';

  // Variables para almacenar la sugerencia y el usuario seleccionado
  public sugerenciaSeleccionada!: SugerenciaApi;
  public usuarioSeleccionado!: UsuarioApi;

  public token: string = '';

  // Constructor
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private establecimientosApi: EstablecimientosApiService,
    private authApi: AuthApiService
  ){}

  /*
    Método que cuando inicia la página, busca ka sugerencia seleccionada por el id proporcionado y busca tambien el usuario
    para mostrar luego el nombre del establecimiento sugerido y el email del usuario.
  */
  ngOnInit(): void {

    this.token = this.authApi.getTokenUserConectado();

    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientosApi.getSugerenciaApiById(id,this.token) )  ).subscribe(  sugerencia =>
      {
        if (!sugerencia) return this.router.navigate(['admin/sugerencias/']);
        this.sugerenciaSeleccionada = sugerencia[0];
        //Datos del formulario ya rellenos
        this.nombre  = this.sugerenciaSeleccionada.nombre;

        this.authApi.getUsersApiById(this.sugerenciaSeleccionada.id_usuario,this.token).subscribe(
          usuario => {
            this.usuarioSeleccionado = usuario[0];

            this.usuario = this.usuarioSeleccionado.email;

          }
        );


        return;
      });


  }

  // Método para cancelar la operación y redirige hacia la pestaña principal.
  public cancelar() {
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
    this.nombre = '';
    this.router.navigate(['admin/sugerencias/']);
  }

  // Método que elimina la sugerencia de la BBDD e informa al usuario de lo que ha sucedido.
  public deleteSugerenciaApi() {
    this.establecimientosApi.deleteSugerenciaApi(this.sugerenciaSeleccionada.id,this.token).subscribe(
      (response) => {
        this.snackbar.open("Sugerencia eliminada correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
          // window.location.reload();
        });
      },
      (error) => {
        this.snackbar.open("Ha ocurrido un error al eliminar la sugerencia", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
          // window.location.reload();
        });
      }
    );

    this.router.navigate(['admin/sugerencias/']);
  }

}
