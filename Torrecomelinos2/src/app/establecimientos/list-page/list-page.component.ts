import { Overlay } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Establecimiento } from 'src/app/interfaces/establecimiento.interface';
import { Zona } from 'src/app/interfaces/zona.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent {

  constructor(private establecimientosService: EstablecimientosJsonService,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay,)
  {}

  public listadoEstablecimientos: Establecimiento[] = [];
  public listadoZonas: Zona[] = [];
  public listadoCategorias: Categoria[] = [];

  public idRol : string = '';

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

    this.idRol = localStorage.getItem('idRol')!;

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

  navigateToDetails(id: string): void {
    this.router.navigate([`establecimientos/details/${id}`]);
  }

  navigateToDelete(id: string): void {
    this.router.navigate([`establecimientos/delete/${id}`]);
  }

  navigateToAdd(): void {
    this.router.navigate([`establecimientos/add`]);
  }

  evitarErrorEnFoto(foto: string): string {
    if (foto.length === 0) {
      return 'assets/no_foto.png';
    }else{
      return foto;
    }
  }

}
