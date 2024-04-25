import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';
import { ZonaApi } from '../../interfaces/zonaApi.interface';
import { EstablecimientoApi } from 'src/app/interfaces/establecimientoApi.interface';
import { AuthApiService } from 'src/app/services/authApi.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent {

  // Variables para almacenar las zonas y categorías de los establecimientos
  public listadoZonas: ZonaApi[] = [];
  public listadoCategorias: CategoriaApi[] = [];

  // Variable para almacenar el id de la sugerencia por si se accede a la inserccion de establecimientos desde la gestión de sugerencias.
  public idEstablecimientoSugerido: number = 0;

  // Variable para almacenar los datos escritos por el usuario del establecimiento
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
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private establecimientoApi: EstablecimientosApiService,
    private authApi: AuthApiService
  ){

  }


  /*
    Cuando se inicie la página, vera si tiene id la sugerencia y si pasa eso es que el administrador va a añadir una sugerencia y lo que se hace es cuando acepte
    la sugerencia y rediriga a la pagina para añadirla se la rellenara automáticamente los datos de la sugerencia que son el nombre y en enlace web y ni no tiene
    id la sugerencia, esos campos estan vacíos para rellenarlos como un nuevo establecimiento.

    También almacena en las listas de zonas y categoría los datos de estas de las BBDD.
  */
  async ngOnInit(){
    // Obtener tokenApi API
    this.tokenApi = sessionStorage.getItem('tokenApi')!;

    this.route.queryParams.subscribe(params => {
      this.idEstablecimientoSugerido = params['sugerenciaId'];
      // Utiliza el ID de la sugerencia para cargar los datos de la sugerencia, o realiza cualquier otra lógica necesaria
    });

    if (this.idEstablecimientoSugerido !== undefined) {
      this.establecimientoApi.getSugerenciaApiById(this.idEstablecimientoSugerido,this.tokenApi).subscribe(
        sugerencias => {
          this.nombre = sugerencias[0].nombre;
          this.enlace = sugerencias[0].enlace;
        }
      );
    }

    // Obtener zonas
    const responseZonas= await this.establecimientoApi.getZonasApi(this.tokenApi).toPromise();
    this.listadoZonas = responseZonas!;

    // Obtener categorías
    const responseCategorias= await this.establecimientoApi.getCategoriasApi(this.tokenApi).toPromise();
    this.listadoCategorias = responseCategorias!;


  }

  // Método que redirige hacia la pestaña inicial de los establecimientos
  public goToList(){
    this.router.navigate(['/establecimientos/list']);
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

  // Método para evitar de que la foto de establecimiento salga vacía y se le pone una estándar.
  evitarErrorEnFoto(foto: string): string {
    if (foto.length === 0) {
      return 'assets/no_foto.png';
    }else{
      return foto;
    }
  }


  // Método que inserta el establecimiento si he rellenado los campos mínimos obligatorios y si esta OK o NO OK, se le notifica al usuario con un mensaje de error o de confirmación
  public addEstablecimientoApi(): void {

    // Verificar que se haya proporcionado un nombre para el establecimiento
    if (this.nombre.length === 0 || this.id_zona === 0 || this.id_categoria === 0) {
      this.snackbar.open("No has rellenado todos los datos obligatorios", "Cerrar", { duration: 2000, panelClass: ['background'] });
      return;
    }

    // Crear el objeto de establecimiento con el nuevo ID y los demás datos
    const establecimientoAdd: EstablecimientoApi = {
      id: 0,
      id_zona: parseInt(this.id_zona.toString()),
      id_categoria: parseInt(this.id_categoria.toString()),
      nombre: this.nombre,
      descripcion: this.descripcion,
      numResenas: this.numResenas,
      direccion: this.direccion,
      telefono: this.telefono,
      foto: this.foto,
      enlace: this.enlace,
    };

    // Aplicar la llamada al servicio para añadir un establecimiento
    this.establecimientoApi.addEstablecimientoApi(establecimientoAdd,this.tokenApi).subscribe(
      repuesta => {
        this.snackbar.open("Establecimiento añadido correctamente", "Cerrar", { duration: 2000, panelClass: ['background'] });
        this.router.navigate(['/establecimientos']);
      }
    );

  }



}
