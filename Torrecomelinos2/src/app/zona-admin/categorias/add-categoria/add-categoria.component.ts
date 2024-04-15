import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

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

  // public addCategoria() {
  //   // Obtener la lista de categorías para determinar el máximo ID actual
  //   this.establecimientosJsonService.getCategorias().subscribe(
  //       categorias => {
  //           let maxId = 0;

  //           // Encontrar el máximo ID actual entre las categorías existentes
  //           categorias.forEach(categoria => {
  //               const idNum = parseInt(categoria.id);
  //               if (idNum > maxId) {
  //                   maxId = idNum;
  //               }
  //           });

  //           // Generar el nuevo ID sumando 1 al máximo ID encontrado
  //           const nuevoId = (maxId + 1).toString();

  //           // Capitalizar el nombre de la categoría
  //           const nombreEstandar = this.capitalizarPalabra(this.nombre);

  //           // Verificar si la categoría ya existe
  //           this.establecimientosJsonService.getCategoriasByName(nombreEstandar).subscribe(
  //               categorias => {
  //                   const categoriaExistente = categorias[0];

  //                   if (categoriaExistente != undefined) {
  //                       this.snackbar.open("Esta categoría ya existe.", "Cerrar", { duration: 2000, panelClass: ['background'] });
  //                       this.nombre = '';
  //                       return;
  //                   }

  //                   // Crear el objeto de categoría con el nuevo ID y el nombre capitalizado
  //                   const categoriaNueva: Categoria = {
  //                       id: nuevoId,
  //                       nombre: nombreEstandar
  //                   };

  //                   // Agregar la nueva categoría utilizando el servicio correspondiente
  //                   this.establecimientosJsonService.addCategoria(categoriaNueva).subscribe(
  //                       (response) => {
  //                           this.snackbar.open("Categoría añadida correctamente.", "Cerrar", { duration: 2000, panelClass: ['background'] }).afterDismissed().subscribe(() => {
  //                               window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
  //                               this.nombre = ''; // Limpiar el campo de nombre
  //                           });
  //                       },
  //                       (error) => {
  //                           this.snackbar.open("Ha ocurrido un error al añadir la categoría", "Cerrar", { duration: 2000, panelClass: ['background'] }).afterDismissed().subscribe(() => {
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

  public addCategoriaApi() {
    // Capitalizar el nombre de la zona
    const nombreEstandar = this.capitalizarPalabra(this.nombre);

    this.establecimientosApi.getCategoriaByNameApi(nombreEstandar).subscribe(
      zonas => {
        const categoriaExistente = zonas[0];

        if (categoriaExistente != undefined) {
          this.snackbar.open("Esta categoria ya existe.", "Cerrar", { duration: 2000, panelClass: ['background'] });
          this.nombre = '';
          return;
        }else {
          const zonaAdd :CategoriaApi = {
            id: 0,
            nombre: nombreEstandar
          }

          this.establecimientosApi.addCategoriaApi(zonaAdd).subscribe(
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
