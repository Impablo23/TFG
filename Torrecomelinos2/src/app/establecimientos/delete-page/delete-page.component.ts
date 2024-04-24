import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { EstablecimientoApi } from 'src/app/interfaces/establecimientoApi.interface';
import { AuthApiService } from 'src/app/services/authApi.service';

@Component({
  selector: 'app-delete-page',
  templateUrl: './delete-page.component.html',
  styleUrls: ['./delete-page.component.css']
})
export class DeletePageComponent {

  // Variable para almacenar los datos del establecimiento seleccionado
  public establecimientoDetalles?: EstablecimientoApi;

  // Variables para almacenar el id y el nombre del establecimiento seleccionado
  public idEstablecimiento: number = 0;
  public nombreEstablecimiento: string = '';

  public token : string = "";

  // Constructor
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private establecimientoApi: EstablecimientosApiService,
    private authApi: AuthApiService
  ){}

  // Método para redirigir hacia el listado de establecimientos
  public goToList(){
    this.router.navigate(['/establecimientos/list']);
  }

  // Método que al iniciar la página, recoge los datos del establecimiento seleccionado y los almacena en el formulario y almacena en los listados las zonas y categorias
  ngOnInit(): void {

    this.token = this.authApi.getTokenUserConectado();

    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientoApi.getEstablecimientoApiById(id,this.token) )  ).subscribe(  establecimiento =>
      {
        if (!establecimiento) return this.router.navigate(['/establecimientos/list']);

        this.establecimientoDetalles = establecimiento[0];

        this.idEstablecimiento = establecimiento[0].id;
        this.nombreEstablecimiento = establecimiento[0].nombre;

        return;
      });

  }

  // Método que elimina el establecimiento de la BBDD enviando un mensaje de confirmación o denegación a la eliminación
  public deleteEstablecimientoApi(id: number) {

    this.establecimientoApi.deleteEstablecimientoApi(id).subscribe(
      (response) => {
        this.snackbar.open("Establecimiento eliminado correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
        this.router.navigate([`/establecimientos/list`])
      },
      (error) => {
        this.snackbar.open("Error al eliminar el establecimiento", "Cerrar",{duration: 2000,panelClass:['background']});
        this.router.navigate([`/establecimientos/list`])
      }
    );

  }

}
