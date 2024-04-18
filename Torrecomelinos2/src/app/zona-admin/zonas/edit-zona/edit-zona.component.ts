import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';

@Component({
  selector: 'app-edit-zona',
  templateUrl: './edit-zona.component.html',
  styleUrls: ['./edit-zona.component.css']
})
export class EditZonaComponent {

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
        if (!zona) return this.router.navigate(['admin/zona/']);
        this.zonaSeleccionada = zona[0];
        // Datos del formulario ya rellenos
        this.nombre  = this.zonaSeleccionada!.nombre;


        return;
      });


  }


  // Método que cancela la operacion y redirige hacia la ruta principal de categorías donde se encuentra la inserccion de nuevas zonas.
  public cancelar() {
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
    this.nombre = '';
    this.router.navigate(['admin/zona/']);
  }


  /*
    Método que edita la zona seleccionada si hay escrito algo en el campo de nombre y si esta OK o NO OK, se le notifica al usuario con el error o la confirmacion
    de la edición dependiendo del caso.
  */
  public editZonaApi() {

    if (this.nombre.length === 0 ) {
      this.snackbar.open("Es obligatorio rellenar el nombre de la zona", "Cerrar",{duration: 2000,panelClass:['background']});
      return;
    }

    // LLamada a la BBDD para comprobar si lo que se ha insertado existe o no.
    this.establecimientosApi.getZonaByNameApi(this.nombre).subscribe(
      zonas => {
        const zonaExistente = zonas[0];

        if (zonaExistente != undefined) {
          this.snackbar.open("Esta zona ya existe.", "Cerrar", { duration: 2000, panelClass: ['background'] });
          this.nombre = '';
          this.router.navigate(['admin/zonas/']);
          return;
        }else {
          const zonaEditada :ZonaApi = {
            id: this.zonaSeleccionada!.id,
            nombre: this.nombre
          }

          this.establecimientosApi.updateZonaApi(zonaEditada).subscribe(
            (response) => {
              this.snackbar.open("Zona actualizada correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
                // window.location.reload();
              });
            },
            (error) => {
              this.snackbar.open("Ha ocurrido un error al actualizar la zona", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
                // window.location.reload();
              });
            }
          );

          this.router.navigate(['admin/zonas/']);
        }
      }
    );



  }

}
