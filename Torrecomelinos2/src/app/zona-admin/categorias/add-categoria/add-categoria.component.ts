import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent {

  public nombre: string = '';

  public numCategorias : number = 0;

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

    this.establecimientosJsonService.getCategorias().subscribe(
      categorias => {

        // Ver cantidad de zonas para el id.
        this.numCategorias = categorias.length;

        const nombreEstandar = this.capitalizarPalabra(this.nombre);

        this.establecimientosJsonService.getCategoriasByName(nombreEstandar).subscribe(
          categorias => {

            const categoria = categorias[0];

            if (categoria != undefined) {
              this.snackbar.open("Esta zona ya existe.", "Cerrar",{duration: 2000,panelClass:['background']});
              this.nombre = '';
              return;
            }

            const categoriaNueva: Categoria = {
              id: (this.numCategorias+1).toString(),
              nombre: nombreEstandar
            }

            this.establecimientosJsonService.addCategoria(categoriaNueva).subscribe(
              (response) => {
                this.snackbar.open("Categoria añadida correctamente.", "Cerrar",{duration: 2000,panelClass:['background']});
                this.nombre = '';
                window.location.reload();
              },
              (error) => {
                this.snackbar.open("Error al añadir la categoria.", "Cerrar",{duration: 2000,panelClass:['background']});
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
