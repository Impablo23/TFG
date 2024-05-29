import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';
import { EstablecimientoApi } from 'src/app/interfaces/establecimientoApi.interface';
import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';
import { AuthApiService } from 'src/app/services/authApi.service';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent {

  // Variable para almacenar los datos del establecimiento seleccionado
  public establecimientoDetalles?: EstablecimientoApi;

  // Variables para almacenar los datos de las zonas y categorías de los establecimientos
  public listadoZonas: ZonaApi[] = [];
  public listadoCategorias: CategoriaApi[] = [];


  // Variables donde se almacenan los datos que ha escrito el usuario en el formulario
  public nombre: string = '';
  public descripcion: string = '';
  public direccion: string = '';
  public telefono: string = '';
  public foto: string = '';
  public enlace: string = '';
  public numResenas: number = 0;
  public id_zona: number = 0;
  public id_categoria: number = 0;

  public tokenApi : string = "";


  // Constructor
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private establecimientoApi: EstablecimientosApiService,
    private authApi: AuthApiService
  ){

  }


  // Método que al iniciar la página, recoge los datos del establecimiento seleccionado y los almacena en el formulario y almacena en los listados las zonas y categorias
  async ngOnInit(){

    // Obtener tokenApi API
    this.tokenApi = sessionStorage.getItem('tokenApi')!;

    await this.obtenerEstablecimiento();

  }

  async obtenerEstablecimiento() {

    // Obtener zonas
    const responseZonas = await this.establecimientoApi.getZonasApi(this.tokenApi).toPromise();
    this.listadoZonas = responseZonas!;

    // Obtener categorías
    const responseCategorias = await this.establecimientoApi.getCategoriasApi(this.tokenApi).toPromise();
    this.listadoCategorias = responseCategorias!;

    this.activatedRoute.params.pipe(switchMap(({ id }) => this.establecimientoApi.getEstablecimientoApiById(id, this.tokenApi))).subscribe(establecimiento => {
        if (!establecimiento) return this.router.navigate(['/establecimientos/list']);

        this.establecimientoDetalles = establecimiento[0];
        //Datos del formulario ya rellenos
        this.nombre = this.establecimientoDetalles!.nombre;
        this.descripcion = this.establecimientoDetalles!.descripcion;
        this.direccion = this.establecimientoDetalles!.direccion;
        this.telefono = this.establecimientoDetalles!.telefono;
        this.foto = this.establecimientoDetalles!.foto;
        this.enlace = this.establecimientoDetalles!.enlace;
        this.numResenas = this.establecimientoDetalles!.numResenas;
        this.id_zona = this.establecimientoDetalles!.id_zona;
        this.id_categoria = this.establecimientoDetalles!.id_categoria;

        return;
    });


  }



  // Método que redirige hacia la pagina de los detalles del establecimiento seleccionado
  public goToDetails(id: number){
    this.router.navigate([`/establecimientos/details/${id}`]);
  }

  // Método que devuelve el nombre de la zona segun su id
  obtenerNombreZona(idZona: number): string {
    let nombre:string = '';
    for (const zona of this.listadoZonas) {

      if (zona.id == idZona) {
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

  // Método para evitar de que la foto de establecimiento salga vacía y se le pone una estándar.
  evitarErrorEnFoto(foto: string): string {
    if (foto.length === 0) {
      return 'assets/no_foto.png';
    }else{
      return foto;
    }
  }


  /*
    Método que edita el establecimiento seleccionado si los campos obligatorios estan rellenos y si esto todo OK, notifica y redirige hacia la pestaña de los
    detalles del establecimiento seleccionado y si está NO OK, notifica el error.
  */
  public editarEstablecimientoApi() {

    const establecimientoEditado: EstablecimientoApi = {
      id: this.establecimientoDetalles!.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      numResenas: Math.trunc(this.numResenas),
      direccion: this.direccion,
      telefono: this.telefono,
      foto: this.foto,
      enlace: this.enlace,
      id_zona: this.id_zona,
      id_categoria: this.id_categoria
    }

    // Verificar que se haya proporcionado un nombre para el establecimiento
    if (this.nombre.length === 0 || this.id_zona === 0 || this.id_categoria === 0) {
      this.snackbar.open("No has rellenado todos los datos obligatorios", "Cerrar", { duration: 2000, panelClass: ['background'] });
      return;
    }

    this.establecimientoApi.updateEstablecimientoApi(establecimientoEditado,this.tokenApi).subscribe(
      (response) => {
        this.snackbar.open("Establecimiento actualizado correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
        this.router.navigate([`/establecimientos/details/${establecimientoEditado.id}`])
      },
      (error) => {
        this.snackbar.open("Ha ocurrido un error al actualizar el establecimiento", "Cerrar",{duration: 2000,panelClass:['background']});
      }
    )

  }


}



