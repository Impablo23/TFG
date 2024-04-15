import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

@Component({
  selector: 'app-delete-categoria',
  templateUrl: './delete-categoria.component.html',
  styleUrls: ['./delete-categoria.component.css']
})
export class DeleteCategoriaComponent {

  public nombre: string = '';

  public categoriaSeleccionada!: CategoriaApi;

  constructor(
    private establecimientosJsonService: EstablecimientosJsonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private establecimientosApi: EstablecimientosApiService
  ){}

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

  public cancelar() {
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
    this.nombre = '';
    this.router.navigate(['admin/categorias/']);
  }

  // public deleteCategoria() {
  //   this.establecimientosJsonService.deleteCategoria(this.categoriaSeleccionada.id).subscribe(
  //     (response) => {
  //       this.snackbar.open("Categoria eliminada correctamente.", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
  //         window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
  //       });
  //     },
  //     (error) => {
  //     this.snackbar.open("Ha ocurrido un error al eliminar la categoría.", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
  //       window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
  //     });
  //     }
  //   );
  //   this.router.navigate(['admin/categorias/']);
  // }

  public deleteCategoriaApi() {
    this.establecimientosApi.deleteCategoriaApi(this.categoriaSeleccionada.id).subscribe(
      (response) => {
        this.snackbar.open("Categoria eliminada correctamente.", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
          window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
        });
      },
      (error) => {
      this.snackbar.open("Ha ocurrido un error al eliminar la categoría.", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
        window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
      });
      }
    );
    this.router.navigate(['admin/categorias/']);
  }
}
