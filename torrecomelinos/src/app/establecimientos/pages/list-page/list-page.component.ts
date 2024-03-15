import { Component } from '@angular/core';
import { Establecimiento } from 'src/app/interfaces/establecimiento.interface';
import { EstablecimientosJsonService } from '../../../services/establecimientos.service';
import { Zona } from 'src/app/interfaces/zona.interface';
import { Categoria } from 'src/app/interfaces/categoria.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent {

  constructor(private establecimientosService: EstablecimientosJsonService){}

  public listadoEstablecimientos: Establecimiento[] = [];
  public listadoZonas: Zona[] = [];
  public listadoCategorias: Categoria[] = [];

  ngOnInit(): void {
    this.establecimientosService.getEstablecimientos().subscribe(listado => {
      this.listadoEstablecimientos = listado;
    });

    this.establecimientosService.getZonas().subscribe(zonas => {
      this.listadoZonas = zonas;
    });

    this.establecimientosService.getCategorias().subscribe(categoria => {
      this.listadoCategorias = categoria;
    });

  }

  obtenerNombreZona(idZona: number): string {
    let nombre:string = '';
    for (const zona of this.listadoZonas) {
      // console.log(zona.id);
      // console.log(zona.nombre);
      if (zona.id == idZona) {
        nombre = zona.nombre
      }
    }
    return nombre;
  }

  obtenerNombreCategoria(idCategoria: number): string {
    let nombre:string = '';
    for (const categoria of this.listadoCategorias) {
      // console.log(zona.id);
      // console.log(zona.nombre);
      if (categoria.id == idCategoria) {
        nombre = categoria.nombre
      }
    }
    return nombre;
  }

}
