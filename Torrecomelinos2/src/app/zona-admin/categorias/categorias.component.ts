import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {

  constructor(public router: Router,private establecimientosJsonService: EstablecimientosJsonService){}

  ngOnInit(){
    this.listarZonas();
  }
  public listadoCategorias: Categoria[] = [];

  public listarZonas(){
    this.establecimientosJsonService.getCategorias().subscribe(
      categorias => {
        this.listadoCategorias = categorias;
      }
    );
  }

  public goToEditZona(id: string) {
    this.router.navigate(['admin/categorias/edit', id]);
  }

  public goToDeleteZona(id: string) {
    this.router.navigate(['admin/categorias/delete', id]);
  }

}
