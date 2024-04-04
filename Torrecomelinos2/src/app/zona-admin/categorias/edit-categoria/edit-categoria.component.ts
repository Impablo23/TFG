import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrls: ['./edit-categoria.component.css']
})
export class EditCategoriaComponent {

  public nombre: string = '';

  public categoriaSeleccionada!: Categoria;

  constructor(
    private establecimientosJsonService: EstablecimientosJsonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientosJsonService.getCategoriasById(id) )  ).subscribe(  categoria =>
      {
        if (!categoria) return this.router.navigate(['/categoria']);
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

  public editCategoria() {
    // const contador: number = 14;
    const zonaEditada: Categoria = {
      id: this.categoriaSeleccionada!.id,
      nombre: this.nombre,
    }

    if (this.nombre.length === 0 ) {
      this.snackbar.open("Es obligatorio rellenar el nombre de la categoria", "Cerrar",{duration: 2000,panelClass:['background']});
      return;
    }

    this.establecimientosJsonService.updateCategoria(zonaEditada).subscribe(
      (response) => {
        // console.log('perita');
        this.snackbar.open("Categoria actualizada correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
        window.location.reload();
      },
      (error) => {
        // console.log('mal');
        this.snackbar.open("Ha ocurrido un error al actualizar la categoria", "Cerrar",{duration: 2000,panelClass:['background']});
        window.location.reload();
      }
    )

  }

}
