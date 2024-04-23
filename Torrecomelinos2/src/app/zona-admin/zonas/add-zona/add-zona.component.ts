import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';

@Component({
  selector: 'app-add-zona',
  templateUrl: './add-zona.component.html',
  styleUrls: ['./add-zona.component.css']
})
export class AddZonaComponent implements OnInit {

  // Variable para almacenar el nombre de la zona
  public nombre: string = '';

  // Variable para almacenar el estado de las zonas
  public numZonas : number = 0;

  public tokenApi : string = "";

  // Constructor
  constructor(
    private snackbar: MatSnackBar,
    private establecimientosApi: EstablecimientosApiService
  ){}

  ngOnInit() {

    this.tokenApi = localStorage.getItem('tokenApi')!;
  }

  // Método que cancela la operacion eliminado los datos del campo nombre
  public cancelar() {
    this.nombre = '';
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
  }

  /*
    Método que añade la zona si hay escrito algo en el campo de nombre y si esta OK o NO OK, se le notifica al usuario con el error o la confirmacion
    de la edición dependiendo del caso.
  */
  public addZonaApi() {

    // Capitalizar el nombre de la zona
    // const nombreEstandar = this.capitalizarPalabra(this.nombre);

    // LLamada a la BBDD para comprobar si lo que se ha insertado existe o no.
    this.establecimientosApi.getZonaByNameApi(this.nombre).subscribe(
      zonas => {
        const zonaExistente = zonas[0];

        if (zonaExistente != undefined) {
          this.snackbar.open("Esta zona ya existe.", "Cerrar", { duration: 2000, panelClass: ['background'] });
          this.nombre = '';
          return;
        }else {
          const zonaAdd :ZonaApi = {
            id: 0,
            nombre: this.nombre
          }

          this.establecimientosApi.addZonaApi(zonaAdd,this.tokenApi).subscribe(
            repuesta => {
              this.snackbar.open( "Zona añadida correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
                // window.location.reload();
              });
              this.nombre = '';
            }
          );
        }
      }
    );

  }


}
