import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';
import { AuthApiService } from 'src/app/services/authApi.service';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrls: ['./edit-categoria.component.css']
})
export class EditCategoriaComponent {

  // Variable que almacena el nombre de la categoría seleccionada
  public nombre: string = '';

  // Variable que almacena la categoría específica
  public categoriaSeleccionada!: CategoriaApi;

  public tokenApi : string = "";

  // Constructor
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private establecimientosApi: EstablecimientosApiService,
    private authApi: AuthApiService
  ){}

  // Método que al iniciar la página, busca la categoría específica según el id seleccionado y guardamos la categoría y el nombre en las variables anteriores.
  ngOnInit(): void {

    this.tokenApi = sessionStorage.getItem('tokenApi')!;

    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientosApi.getCategoriaApiById(id,this.tokenApi) )  ).subscribe(  categoria =>
      {
        if (!categoria) return this.router.navigate(['admin/categorias/']);
        this.categoriaSeleccionada = categoria[0];
        //Datos del formulario ya rellenos
        this.nombre  = this.categoriaSeleccionada!.nombre;

        return;
      }
    );

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

  // Método que cancela la operacion y redirige hacia la ruta principal de categorías donde se encuentra la inserccion de nuevas categorías.
  public cancelar() {
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
    this.nombre = '';
    this.router.navigate(['admin/categorias/']);
  }

  /*
    Método que edita la categoría seleccionada si hay escrito algo en el campo de nombre y si esta OK o NO OK, se le notifica al usuario con el error o la confirmacion
    de la edición dependiendo del caso.
  */
  public editCategoria() {

    // Capitalizar el nombre de la zona
    const nombreEstandar = this.capitalizarPalabra(this.nombre);

    if (this.nombre.length === 0 ) {
      this.snackbar.open("Es obligatorio rellenar el nombre de la categoria", "Cerrar",{duration: 2000,panelClass:['background']});
      return;
    }

    // LLamada a la BBDD para comprobar si lo que se ha editado existe o no.
    this.establecimientosApi.getCategoriaByNameApi(nombreEstandar,this.tokenApi).subscribe(
      zonas => {
        const categoriaExistente = zonas[0];

        if (categoriaExistente != undefined) {
          this.snackbar.open("Esta categoria ya existe.", "Cerrar", { duration: 2000, panelClass: ['background'] });
          this.nombre = '';
          this.router.navigate(['admin/categorias/']);
          return;
        }else {

          const categoriaEditada: CategoriaApi = {
            id: this.categoriaSeleccionada!.id,
            nombre: this.nombre,
          }

          this.establecimientosApi.updateCategoriaApi(categoriaEditada,this.tokenApi).subscribe(
            (response) => {
              this.snackbar.open("Categoria actualizada correctamente.", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
                // window.location.reload();
              });
            },
            (error) => {
              this.snackbar.open("Ha ocurrido un error al actualizar la categoria.", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
                // window.location.reload();
              });
            }
          );
          this.router.navigate(['admin/categorias/']);
        }
      }
    );

  }

}

