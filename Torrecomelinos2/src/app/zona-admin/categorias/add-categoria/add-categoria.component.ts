import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent {

  // Variable para almacenar el nombre de la categoría
  public nombre: string = '';

  // Variable para almacenar el estado de las categorías
  public numCategorias : number = 0;

  // Constructor
  constructor(
    private snackbar: MatSnackBar,
    private establecimientosApi: EstablecimientosApiService
  ){}

  ngOnInit() {
  }

  // Método que cancela la operacion eliminado los datos del campo nombre
  public cancelar() {
    this.nombre = '';
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
  }


  /*
    Método que añade la categoría si hay escrito algo en el campo de nombre y si esta OK o NO OK, se le notifica al usuario con el error o la confirmacion
    de la edición dependiendo del caso.
  */
  public addCategoriaApi() {

    // LLamada a la BBDD para comprobar si lo que se ha insertado existe o no.
    this.establecimientosApi.getCategoriaByNameApi(this.nombre).subscribe(
      zonas => {
        const categoriaExistente = zonas[0];

        if (categoriaExistente != undefined) {
          this.snackbar.open("Esta categoria ya existe.", "Cerrar", { duration: 2000, panelClass: ['background'] });
          this.nombre = '';
          return;
        }else {
          const zonaAdd :CategoriaApi = {
            id: 0,
            nombre: this.nombre
          }

          this.establecimientosApi.addCategoriaApi(zonaAdd).subscribe(
            repuesta => {
              this.snackbar.open( "Categoria añadida correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
                // window.location.reload();
              });
            }
          );
          this.nombre = '';
        }
      }
    );
  }


}
