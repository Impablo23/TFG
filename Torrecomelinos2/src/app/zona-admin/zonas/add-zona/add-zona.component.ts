import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Zona } from 'src/app/interfaces/zona.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';

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
    private snackbar: MatSnackBar
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
  }

  public addZona() {

    this.establecimientosJsonService.getZonas().subscribe(
      zonas => {

        // Ver cantidad de zonas para el id.
        this.numZonas = zonas.length;

        const nombreEstandar = this.capitalizarPalabra(this.nombre);

        this.establecimientosJsonService.getZonaByName(nombreEstandar).subscribe(
          zonas => {

            const zona = zonas[0];

            if (zona != undefined) {
              this.snackbar.open("Esta zona ya existe.", "Cerrar",{duration: 2000,panelClass:['background']});
              this.nombre = '';
              return;
            }

            const zonaNueva: Zona = {
              id: (this.numZonas+1).toString(),
              nombre: nombreEstandar
            }

            this.establecimientosJsonService.addZona(zonaNueva).subscribe(
              (response) => {
                this.snackbar.open("Zona añadida correctamente.", "Cerrar",{duration: 2000,panelClass:['background']});
                this.nombre = '';
                window.location.reload();
              },
              (error) => {
                this.snackbar.open("Error al añadir la zona.", "Cerrar",{duration: 2000,panelClass:['background']});
                this.nombre = '';
                window.location.reload();
              }
            );





          }
        );
      }
    );


  }

}
