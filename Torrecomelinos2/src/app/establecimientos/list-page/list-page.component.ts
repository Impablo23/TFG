import { Overlay } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Establecimiento } from 'src/app/interfaces/establecimiento.interface';
import { Zona } from 'src/app/interfaces/zona.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';
import { EstablecimientoApi } from '../../interfaces/establecimientoApi.interface';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';
import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';
import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent {

  constructor(private establecimientosService: EstablecimientosJsonService,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay,
    private establecimientoApi: EstablecimientosApiService
  )
  {}

  public listadoEstablecimientos: EstablecimientoApi[] = [];
  public listadoZonas: ZonaApi[] = [];
  public listadoCategorias: CategoriaApi[] = [];

  public idRol : string = '';

  ngOnInit(): void {
    // this.establecimientosService.getEstablecimientos().subscribe(listado => {
    //   this.listadoEstablecimientos = listado;
    // });

    this.establecimientoApi.getEstablecimientosApi().subscribe(
      establecimientos => {
        this.listadoEstablecimientos = establecimientos;
      }
    );

    // this.establecimientosService.getZonas().subscribe(zonas => {
    //   this.listadoZonas = zonas;
    // });

    this.establecimientoApi.getZonasApi().subscribe(
      zonas => {
        this.listadoZonas = zonas
      }
    );

    // this.establecimientosService.getCategorias().subscribe(categoria => {
    //   this.listadoCategorias = categoria;
    // });

    // this.establecimientoApi.getCategoriasApi().subscribe(
    //   categorias => {
    //     this.listadoCategorias = categorias
    //   }
    // );

    this.idRol = localStorage.getItem('idRol')!;

  }

  obtenerNombreZona(idZona: number): string {
    let nombre:string = '';
    for (const zona of this.listadoZonas) {
      // console.log(zona.id);
      // console.log(zona.nombre);
      if (zona.id === idZona) {
        nombre = zona.nombre
      }
      if (idZona === 0) {
        nombre = 'Sin Especificar';
      }
    }
    return nombre;
  }

  // obtenerNombreCategoria(idCategoria: number): string {
  //   let nombre:string = '';
  //   for (const categoria of this.listadoCategorias) {
  //     // console.log(zona.id);
  //     // console.log(zona.nombre);
  //     if (categoria.id == idCategoria) {
  //       nombre = categoria.nombre
  //     }
  //   }
  //   return nombre;
  // }

  navigateToDetails(id: number): void {
    this.router.navigate([`establecimientos/details/${id}`]);
  }

  navigateToDelete(id: number): void {
    this.router.navigate([`establecimientos/delete/${id}`]);
  }

  navigateToAdd(): void {
    this.router.navigate([`establecimientos/add`]);
  }

  navigateToSuggestion(): void {
    this.router.navigate(['establecimientos/suggestions'])
  }

  evitarErrorEnFoto(foto: string): string {
    if (foto.length === 0) {
      return 'assets/no_foto.png';
    }else{
      return foto;
    }
  }

}
