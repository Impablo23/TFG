import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';

@Component({
  selector: 'app-delete-zona',
  templateUrl: './delete-zona.component.html',
  styleUrls: ['./delete-zona.component.css']
})
export class DeleteZonaComponent {

  // Variable para almacenar el nombre de la zona seleccionada
  public nombre: string = '';

  // Variable para almacenar la zona específica
  public zonaSeleccionada!: ZonaApi;

  // Constructor
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private establecimientosApi: EstablecimientosApiService
  ){}

  // Método que al iniciar la página, busca la zona específica según el id seleccionado y guardamos la categoría y el nombre en las variables anteriores.
  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientosApi.getZonaApiById(id) )  ).subscribe(  zona =>
      {
        if (!zona) return this.router.navigate(['admin/zonas']);
        this.zonaSeleccionada = zona[0];
        //Datos del formulario ya rellenos
        this.nombre  = this.zonaSeleccionada!.nombre;

        return;
      });


  }

  // Método que cancela la operacion y redirige hacia la ruta principal de categorías donde se encuentra la inserccion de nuevas zonas.
  public cancelar() {
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
    this.nombre = '';
    this.router.navigate(['admin/zonas/']);
  }

  // Método que elimina la zona de la BBDD y envia al usuario un mensaje de error o confirmacion dependiendo de lo que ha sucedido.
  public deleteZona() {
    this.establecimientosApi.deleteZonaApi(this.zonaSeleccionada.id).subscribe(
      (response) => {
        this.snackbar.open("Zona eliminada correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
          // window.location.reload();
          this.nombre='';
        });
      },
      (error) => {
        this.snackbar.open("Ha ocurrido un error al eliminar la zona", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
          // window.location.reload();
          this.nombre='';
        });
      }
    );

    this.router.navigate(['admin/zonas/']);
  }

}
