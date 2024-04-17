import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { EstablecimientoApi } from '../../interfaces/establecimientoApi.interface';
import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';
import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent {

  // Constructor
  constructor(
    private router: Router,
    private establecimientoApi: EstablecimientosApiService
  )
  {}

  // Variables para guardar los datos de los datos,zonas y categorías de los establecimientos.
  public listadoEstablecimientos: EstablecimientoApi[] = [];
  public listadoZonas: ZonaApi[] = [];
  public listadoCategorias: CategoriaApi[] = [];

  // Variable para almacenar el id del rol del usuario
  public idRol : string = '';

  // Método para guardar en las listas todos los datos necesarios de la BBDD y se da valor al idRol.
  ngOnInit(): void {

    this.establecimientoApi.getEstablecimientosApi().subscribe(
      establecimientos => {
        this.listadoEstablecimientos = establecimientos;
      }
    );

    this.establecimientoApi.getZonasApi().subscribe(
      zonas => {
        this.listadoZonas = zonas
      }
    );

    this.idRol = localStorage.getItem('idRol')!;

  }

  // Método que devuelve el nombre de la zona segun su id
  obtenerNombreZona(idZona: number): string {
    let nombre:string = '';
    for (const zona of this.listadoZonas) {

      if (zona.id === idZona) {
        nombre = zona.nombre
      }
      if (idZona === 0) {
        nombre = 'Sin Especificar';
      }
    }
    return nombre;
  }

  // Método para redirigir a la pagina de detalles del establecimiento seleccionado
  navigateToDetails(id: number): void {
    this.router.navigate([`establecimientos/details/${id}`]);
  }

  // Método para redirigir a la pagina de eliminación del establecimiento seleccionado
  navigateToDelete(id: number): void {
    this.router.navigate([`establecimientos/delete/${id}`]);
  }

  // Método para redirigir a la pagina de insercción de establecimientos
  navigateToAdd(): void {
    this.router.navigate([`establecimientos/add`]);
  }

  // Método para redirigir a la pagina de sugerencias del usuario
  navigateToSuggestion(): void {
    this.router.navigate(['establecimientos/suggestions'])
  }

  // Método para evitar de que la foto de establecimiento salga vacía y se le pone una estándar.
  evitarErrorEnFoto(foto: string): string {
    if (foto.length === 0) {
      return 'assets/no_foto.png';
    }else{
      return foto;
    }
  }

}
