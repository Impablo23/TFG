import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';

@Component({
  selector: 'app-delete-categoria',
  templateUrl: './delete-categoria.component.html',
  styleUrls: ['./delete-categoria.component.css']
})
export class DeleteCategoriaComponent {

  // Variable que almacena el nombre de la categoría seleccionada
  public nombre: string = '';

  // Variable que almacena la categoría específica
  public categoriaSeleccionada!: CategoriaApi;

  // Constructor
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private establecimientosApi: EstablecimientosApiService
  ){}

  // Método que al iniciar la página, busca la categoría específica según el id seleccionado y guardamos la categoría y el nombre en las variables anteriores.
  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientosApi.getCategoriaApiById(id) )  ).subscribe(  categoria =>
      {
        if (!categoria) return this.router.navigate(['admin/categorias/']);
        this.categoriaSeleccionada = categoria[0];
        //Datos del formulario ya rellenos
        this.nombre  = this.categoriaSeleccionada!.nombre;

        return;
      });


  }

  // Método que cancela la operacion y redirige hacia la ruta principal de categorías donde se encuentra la inserccion de nuevas categorías.
  public cancelar() {
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
    this.nombre = '';
    this.router.navigate(['admin/categorias/']);
  }


  /*
    Método que elimina la categoría seleccionada y muestra al usuario un mensaje de error o confirmación dependiendo de si se ha eliminado OK o NO OK
  */
  public deleteCategoriaApi() {
    this.establecimientosApi.deleteCategoriaApi(this.categoriaSeleccionada.id).subscribe(
      (response) => {
        this.snackbar.open("Categoria eliminada correctamente.", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
          // window.location.reload();
        });
      },
      (error) => {
      this.snackbar.open("Ha ocurrido un error al eliminar la categoría.", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
        // window.location.reload();
      });
      }
    );
    this.router.navigate(['admin/categorias/']);
  }
}
