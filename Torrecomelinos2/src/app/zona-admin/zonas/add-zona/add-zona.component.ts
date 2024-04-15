import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Zona } from 'src/app/interfaces/zona.interface';
import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

@Component({
  selector: 'app-add-zona',
  templateUrl: './add-zona.component.html',
  styleUrls: ['./add-zona.component.css']
})
export class AddZonaComponent implements OnInit {

  public nombre: string = '';

  public numZonas : number = 0;

  constructor(
    private establecimientosJsonService: EstablecimientosJsonService,
    private router: Router,
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

  public cancelar() {
    this.nombre = '';
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
  }

  // public addZona() {
  //   // Obtener la lista de zonas para determinar el máximo ID actual
  //   this.establecimientosJsonService.getZonas().subscribe(
  //       zonas => {
  //           let maxId = 0;

  //           // Encontrar el máximo ID actual entre las zonas existentes
  //           zonas.forEach(zona => {
  //               const idNum = parseInt(zona.id);
  //               if (idNum > maxId) {
  //                   maxId = idNum;
  //               }
  //           });

  //           // Generar el nuevo ID sumando 1 al máximo ID encontrado
  //           const nuevoId = (maxId + 1).toString();

  //           // Capitalizar el nombre de la zona
  //           const nombreEstandar = this.capitalizarPalabra(this.nombre);

  //           // Verificar si la zona ya existe
  //           this.establecimientosJsonService.getZonaByName(nombreEstandar).subscribe(
  //               zonas => {
  //                   const zonaExistente = zonas[0];

  //                   if (zonaExistente != undefined) {
  //                       this.snackbar.open("Esta zona ya existe.", "Cerrar", { duration: 2000, panelClass: ['background'] });
  //                       this.nombre = '';
  //                       return;
  //                   }

  //                   // Crear el objeto de zona con el nuevo ID y el nombre capitalizado
  //                   const zonaNueva: Zona = {
  //                       id: nuevoId,
  //                       nombre: nombreEstandar
  //                   };

  //                   // Agregar la nueva zona utilizando el servicio correspondiente
  //                   this.establecimientosJsonService.addZona(zonaNueva).subscribe(
  //                       (response) => {
  //                           this.snackbar.open("Zona añadida correctamente.", "Cerrar", { duration: 2000, panelClass: ['background'] }).afterDismissed().subscribe(() => {
  //                               window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
  //                               this.nombre = ''; // Limpiar el campo de nombre
  //                           });
  //                       },
  //                       (error) => {
  //                           this.snackbar.open("Ha ocurrido un error al añadir la zona", "Cerrar", { duration: 2000, panelClass: ['background'] }).afterDismissed().subscribe(() => {
  //                               window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
  //                               this.nombre = ''; // Limpiar el campo de nombre
  //                           });
  //                       }
  //                   );
  //               }
  //           );
  //       }
  //   );
  // }

  public addZonaApi() {

    // Capitalizar el nombre de la zona
    const nombreEstandar = this.capitalizarPalabra(this.nombre);

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
                window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
              });
            }
          );
        }
      }
    );

  }


}
