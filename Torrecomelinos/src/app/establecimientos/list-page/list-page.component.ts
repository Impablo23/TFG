import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { EstablecimientoApi } from '../../interfaces/establecimientoApi.interface';
import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';
import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthApiService } from 'src/app/services/authApi.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent {

  // Constructor
  constructor(
    private router: Router,
    private establecimientoApi: EstablecimientosApiService,
    private snackbar: MatSnackBar,
    private authApi: AuthApiService
  )
  {}

  // Variables para guardar los datos de los datos,zonas y categorías de los establecimientos.
  public listadoEstablecimientos: EstablecimientoApi[] = [];
  public listadoZonas: ZonaApi[] = [];
  public listadoCategorias: CategoriaApi[] = [];

  // Variable que guarda los establecimientos dependiendo del filtro del user
  public establecimientosFiltrados: EstablecimientoApi[] = [];

  // Variables para almacenar la zona y categoría seleccionada
  public zonaSeleccionada: number = 0;
  public categoriaSeleccionada: number = 0;

  public tokenApi : string = "";

  // Variable para almacenar el id del rol del usuario
  public idRol : string = '';

  // Método para guardar en las listas todos los datos necesarios de la BBDD y se da valor al idRol.
  async ngOnInit(): Promise<void> {

    // Obtener el token antes de continuar
    this.tokenApi = sessionStorage.getItem('tokenApi')!;

    // Obtener ID de rol
    this.idRol = sessionStorage.getItem('idRol')!;

    await this.obtenerDatos();

  }

  async obtenerDatos() {
    try{
      // Ahora que se tiene el token, continuar con la obtención de datos
      // Obtener establecimientos
      const responseEstablecimientos = await this.establecimientoApi.getEstablecimientosApi(this.tokenApi).toPromise();
      this.listadoEstablecimientos = responseEstablecimientos!;
      this.establecimientosFiltrados = this.listadoEstablecimientos;

      // Obtener zonas
      const responseZonas = await this.establecimientoApi.getZonasApi(this.tokenApi).toPromise();
      this.listadoZonas = responseZonas!;

      // Obtener categorías
      const responseCategorias = await this.establecimientoApi.getCategoriasApi(this.tokenApi).toPromise();
      this.listadoCategorias = responseCategorias!;
    } catch (error) {
      console.error('Error en la inicialización:', error);
      // Manejar errores aquí, si es necesario
    }
  }



  filtrarEstablecimientos(): void {

    // No se porque guardo los id en number pero algunas veces pasa a string asi que los oobligo a que sea numbers
    let zInt = parseInt(this.zonaSeleccionada.toString(),10)
    let cInt = parseInt(this.categoriaSeleccionada.toString(),10)


    if (zInt === 0 && cInt === 0) {
      // Si no se ha seleccionado ni zona ni categoría, mostrar todos los establecimientos
      this.establecimientosFiltrados = this.listadoEstablecimientos;
    } else if (zInt === 0) {
      // Si solo se ha seleccionado una categoría, filtrar por categoría
      this.establecimientosFiltrados = this.listadoEstablecimientos.filter(establecimiento =>
        establecimiento.id_categoria === cInt
      );
      this.snackbar.open("Establecientos de "+this.obtenerNombreCategoria(cInt), "Cerrar",{duration: 2000,panelClass:['background']});
    } else if (cInt === 0) {
      // Si solo se ha seleccionado una zona, filtrar por zona
      this.establecimientosFiltrados = this.listadoEstablecimientos.filter(establecimiento =>
        establecimiento.id_zona === zInt
      );
      this.snackbar.open("Establecientos en "+this.obtenerNombreZona(zInt), "Cerrar",{duration: 2000,panelClass:['background']});
    } else {
      // Si se han seleccionado tanto zona como categoría, filtrar por ambas
      this.establecimientosFiltrados = this.listadoEstablecimientos.filter(establecimiento =>
        establecimiento.id_zona === zInt && establecimiento.id_categoria === cInt
      );
      this.snackbar.open("Establecientos en "+this.obtenerNombreZona(zInt)+" de "+this.obtenerNombreCategoria(cInt), "Cerrar",{duration: 2000,panelClass:['background']});
    }

    // Verificar si no se encontraron establecimientos y mostrar un mensaje
    if (this.establecimientosFiltrados.length === 0) {
      this.snackbar.open("No se encontraron establecimientos que cumplan con los criterios de búsqueda.", "Cerrar", {
          duration: 2000,
          panelClass: ['background']
      });
      // Volver a asignar todos los establecimientos
      this.establecimientosFiltrados = this.listadoEstablecimientos;
    }

  }

  restablecerListado() {
    this.zonaSeleccionada = 0;
    this.categoriaSeleccionada = 0;
    this.establecimientosFiltrados = this.listadoEstablecimientos;
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

  // Método que devuelve el nombre de la categoría segun su id
  obtenerNombreCategoria(idCategoria: number): string {
    let nombre:string = '';
    for (const categoria of this.listadoCategorias) {

      if (categoria.id == idCategoria) {
        nombre = categoria.nombre
      }
      if (idCategoria === 0) {
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


