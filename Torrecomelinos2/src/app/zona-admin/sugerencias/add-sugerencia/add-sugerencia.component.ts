import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { AuthApiService } from 'src/app/services/authApi.service';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { SugerenciaApi } from 'src/app/interfaces/sugerenciaApi.interface';
import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';

@Component({
  selector: 'app-add-sugerencia',
  templateUrl: './add-sugerencia.component.html',
  styleUrls: ['./add-sugerencia.component.css']
})
export class AddSugerenciaComponent {

  // Variables para guardar el nombre  del establecimiento sugerido y el email del usuario
  public nombre: string = '';
  public usuario: string = '';

  // Variables para almacenar la sugerencia y el usuario seleccionado
  public sugerenciaSeleccionada!: SugerenciaApi;
  public usuarioSeleccionado!: UsuarioApi;

  public tokenApi: string = '';

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

    this.tokenApi = sessionStorage.getItem('tokenApi')!;


    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientosApi.getSugerenciaApiById(id,this.tokenApi) )  ).subscribe(  sugerencia =>
      {
        if (!sugerencia) return this.router.navigate(['admin/sugerencias/']);
        this.sugerenciaSeleccionada = sugerencia[0];
        //Datos del formulario ya rellenos
        this.nombre  = this.sugerenciaSeleccionada.nombre;

        this.authApi.getUsersApiById(this.sugerenciaSeleccionada.id_usuario,this.tokenApi).subscribe(
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

  /*
    Método que envia al usuario hacia la pestaña de inserccion de establecimiento para añadir el establecimeinto sugerido y si lo añade, lo elimina
    de las sugerencias y si no no lo elimina.
    Se le informa al usuario de lo que sucede al final.
  */
  public addSugerenciaApi() {



    // Navegar hacia la ruta de agregar establecimiento
    this.router.navigate(['establecimientos', 'add'], { queryParams: { sugerenciaId: this.sugerenciaSeleccionada.id } });

    // Realizar una verificación inicial si el establecimiento ya existe antes de agregarlo
    this.establecimientosApi.getEstablecimientosApiByName(this.sugerenciaSeleccionada.nombre,this.tokenApi).subscribe(
      establecimientos => {
        console.log(establecimientos);
        if (establecimientos[0] !== undefined) {
          // Si el establecimiento ya existe, eliminar la sugerencia
          this.establecimientosApi.deleteSugerenciaApi(this.sugerenciaSeleccionada.id,this.tokenApi).subscribe(
            (response) => {
              console.log('Sugerencia eliminada');
            },
            (error) => {
              console.log('Error al eliminar la sugerencia');
            }
          );
        } else {
          console.log('El establecimiento aún no existe'); // Esto puede ser útil para depurar
        }
      }
    );
  }


}
