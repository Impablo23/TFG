import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {

  // Variable que almacena las categorías recogidas de la BBDD.
  public listadoCategorias: CategoriaApi[] = [];

  // Constructor
  constructor(
    public router: Router,
    private establecimientosApi: EstablecimientosApiService
  ){}

  // Método que al iniciar la página, se cargar las categorias.
  ngOnInit(){
    this.listarCategorias();
  }

  // Método que almacena las categorías de la BBDD en el listado de categorías
  public listarCategorias(){
    this.establecimientosApi.getCategoriasApi().subscribe(
      categorias => {
        this.listadoCategorias = categorias;
      }
    );
  }

  // Método que redirige hacia la edición de una zona en específica
  public goToEditZona(id: number) {
    this.router.navigate(['admin/categorias/edit', id]);
  }

  // Método que redirige hacia la eliminación de una zona en específica
  public goToDeleteZona(id: number) {
    this.router.navigate(['admin/categorias/delete', id]);
  }

}
