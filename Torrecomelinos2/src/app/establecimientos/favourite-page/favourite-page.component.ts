import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';
import { EstablecimientoApi } from 'src/app/interfaces/establecimientoApi.interface';
import { FavoritoApi } from 'src/app/interfaces/favoritoApi.interface';
import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';
import { AuthApiService } from 'src/app/services/authApi.service';


@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourite-page.component.html',
  styleUrls: ['./favourite-page.component.css']
})
export class FavouritePageComponent {

  // Variable que almacena el id del usuario
  public id : string = '';

  public tokenApi : string = "";

  // Variables para almacenar los datos de los establecimientos favoritos del usuario
  public listadoFavoritos : FavoritoApi[] = [];
  public listadoFavoritosDetalles : EstablecimientoApi[] = [];
  public listadoZonas: ZonaApi[] = [];
  public listadoCategorias: CategoriaApi[] = [];

  // Constructor
  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private establecimientoApi: EstablecimientosApiService,
    private authApi: AuthApiService
  ){}

  // Método que al iniciar la pestaña, da valor a la variable id y guarda los datos en los listados con los datos recogidos por la BBDD
  async ngOnInit() {

    this.id = sessionStorage.getItem('idRol')!;

    // Obtener token API
    this.tokenApi = sessionStorage.getItem('tokenApi')!;

    console.log(this.tokenApi);

    // Obtener zonas
    const responseZonas= await this.establecimientoApi.getZonasApi(this.tokenApi).toPromise();
    this.listadoZonas = responseZonas!;

    // Obtener categorías
    const responseCategorias= await this.establecimientoApi.getCategoriasApi(this.tokenApi).toPromise();
    this.listadoCategorias = responseCategorias!;

    this.obtenerDatosEstablecimientosFavoritosApi();


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

  /*
    Método que almacena en el listado de favoritos los datos recogidos de favoritos de la BBDD y a su vez guarda en el listado de los detalles de los establecimientos
    los datos de cada establecimiento favorito mediante el id para así mostrarlos en la página.
  */
  // public obtenerDatosEstablecimientosFavoritosApi(){
  //   this.establecimientoApi.getFavoritosByUserApi(parseInt(this.id),this.tokenApi).subscribe(
  //     favoritos => {
  //       this.listadoFavoritos = favoritos;
  //       for (let i = 0; i < this.listadoFavoritos.length;i++) {
  //         this.establecimientoApi.getEstablecimientoApiById(this.listadoFavoritos[i].id_establecimiento,this.tokenApi).subscribe(
  //           establecimientos => {

  //             const establecimiento: EstablecimientoApi = establecimientos[0];
  //             this.listadoFavoritosDetalles.push(establecimiento);

  //             return;
  //           }
  //         );
  //       }
  //     }
  //   );

  // }

  public async obtenerDatosEstablecimientosFavoritosApi(){
    const response = await this.establecimientoApi.getFavoritosByUserApi(parseInt(this.id),this.tokenApi).toPromise();
    this.listadoFavoritos = response!;

    for (let i = 0; i < this.listadoFavoritos.length; i++) {
        try {
            const establecimientos = await this.establecimientoApi.getEstablecimientoApiById(this.listadoFavoritos[i].id_establecimiento, this.tokenApi).toPromise();
            if (establecimientos !== undefined && establecimientos.length > 0) {
              const establecimiento: EstablecimientoApi = establecimientos[0];
              this.listadoFavoritosDetalles.push(establecimiento);
          } else {
              console.error("La respuesta de getEstablecimientoApiById es undefined o vacía.");
          }
        } catch (error) {
            console.error("Error al obtener establecimiento:", error);
        }
    }
}



  /*
    Método que cuando pulsas el corazón, eliminas el establecimiento favorito del listado de favoritos y el de los datos de los establecimientos
    y a su vez elimina el favorito de la BBDD.
    --ANOTACIÓN--
      Cuando va eliminando y no hay más establecimientos, le redirige a la página inical y si quiere entrar a la página mediante la ruta, le saldrá un mensaje de
      que no tiene favoritos asignados y un boton para volver al listado
    --ANOTACIÓN--
  */
  public eliminaFavoritoApi(id_establecimiento: number) {
    // Buscar el favorito por id_usuario e id_establecimiento y guardar el id del favorito
    console.log(this.listadoFavoritos);
    const favoritoEncontrado = this.listadoFavoritos.find(favorito => favorito.id_usuario === parseInt(this.id) && favorito.id_establecimiento === id_establecimiento);
    console.log(favoritoEncontrado);
    console.log(favoritoEncontrado?.id);
    if (favoritoEncontrado) {
      this.establecimientoApi.deleteFavoritoApi(favoritoEncontrado.id, this.tokenApi).subscribe(
        (response) => {
          // Eliminar el establecimiento de listadoFavoritosDetalles
          const establecimientoIndex = this.listadoFavoritosDetalles.findIndex(establecimiento => establecimiento.id === id_establecimiento);
          if (establecimientoIndex !== -1) {
            this.listadoFavoritosDetalles.splice(establecimientoIndex, 1);
          }
          this.snackbar.open("Establecimiento eliminado de favoritos", "Cerrar",{duration: 2000,panelClass:['background']});

          if (this.listadoFavoritosDetalles.length === 0) {
            this.router.navigate(['/establecimientos'])
          }

        },
        (error) => {
          this.snackbar.open("Error al eliminar el establecimiento", "Cerrar",{duration: 2000,panelClass:['background']});
        }
      );
    } else {
      // Manejar el caso en que no se encuentra el favorito
      this.snackbar.open("No se encontró el favorito para eliminar", "Cerrar",{duration: 2000,panelClass:['background']});
    }
  }


}
