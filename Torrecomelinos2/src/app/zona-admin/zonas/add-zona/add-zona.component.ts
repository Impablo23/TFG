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

  // Constructor
  constructor(
    private snackbar: MatSnackBar,
    private establecimientosApi: EstablecimientosApiService
  ){}

  ngOnInit() {
  }

  // Función para capitalizar el primer carácter
  public capitalizarPalabra(sentence: string): string {
    // Separar el string en palabras individuales
    const words = sentence.split(' ');

    // Convertir la primera letra de cada palabra en minúscula y dejar el resto sin cambios
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Unir las palabras nuevamente en un solo string
    const result = capitalizedWords.join(' ');

    return result;
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
    const nombreEstandar = this.capitalizarPalabra(this.nombre);

    // LLamada a la BBDD para comprobar si lo que se ha insertado existe o no.
    this.establecimientosApi.getZonaByNameApi(nombreEstandar).subscribe(
      zonas => {
        const zonaExistente = zonas[0];

        if (zonaExistente != undefined) {
          this.snackbar.open("Esta zona ya existe.", "Cerrar", { duration: 2000, panelClass: ['background'] });
          this.nombre = '';
          return;
        }else {
          const zonaAdd :ZonaApi = {
            id: 0,
            nombre: nombreEstandar
          }

          this.establecimientosApi.addZonaApi(zonaAdd).subscribe(
            repuesta => {
              this.snackbar.open( "Zona añadida correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
                window.location.reload();
              });
            }
          );
        }
      }
    );

  }


}
