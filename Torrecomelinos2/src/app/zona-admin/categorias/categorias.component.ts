import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {

  constructor(public router: Router,private establecimientosJsonService: EstablecimientosJsonService, private establecimientosApi: EstablecimientosApiService){}

  ngOnInit(){
    this.listarZonas();
  }
  public listadoCategorias: CategoriaApi[] = [];

  public listarZonas(){
    this.establecimientosApi.getCategoriasApi().subscribe(
      categorias => {
        this.listadoCategorias = categorias;
      }
    );
  }

  public goToEditZona(id: number) {
    this.router.navigate(['admin/categorias/edit', id]);
  }

  public goToDeleteZona(id: number) {
    this.router.navigate(['admin/categorias/delete', id]);
  }

}
