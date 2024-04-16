import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';
import { Establecimiento } from 'src/app/interfaces/establecimiento.interface';
import { EstablecimientoApi } from 'src/app/interfaces/establecimientoApi.interface';
import { Favorito } from 'src/app/interfaces/favorito.interface';
import { FavoritoApi } from 'src/app/interfaces/favoritoApi.interface';
import { Zona } from 'src/app/interfaces/zona.interface';
import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourite-page.component.html',
  styleUrls: ['./favourite-page.component.css']
})
export class FavouritePageComponent {

  public id : string = '';

  public listadoFavoritos : FavoritoApi[] = [];
  public listadoFavoritosDetalles : EstablecimientoApi[] = [];
  public listadoZonas: ZonaApi[] = [];
  public listadoCategorias: CategoriaApi[] = [];

  constructor(
    private establecimientosJsonService: EstablecimientosJsonService,
    private snackbar: MatSnackBar,
    private establecimientoApi: EstablecimientosApiService
  ){}

  ngOnInit() {
    this.id = localStorage.getItem('id')!;

    this.establecimientoApi.getZonasApi().subscribe(
      zonas => {
        this.listadoZonas = zonas
      }
    );

    this.establecimientoApi.getCategoriasApi().subscribe(
      categorias => {
        this.listadoCategorias = categorias
      }
    );
    // this.listadoFavoritos = [];
    // this.listadoFavoritosDetalles = [];
    this.obtenerDatosEstablecimientosFavoritosApi();

    // console.log(this.listadoFavoritosDetalles);
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

  evitarErrorEnFoto(foto: string): string {
    if (foto.length === 0) {
      return 'assets/no_foto.png';
    }else{
      return foto;
    }
  }

  // public obtenerDatosEstablecimientosFavoritos(){
  //   this.establecimientosJsonService.getFavoritosByUser(this.id).subscribe(
  //     favoritos => {
  //       this.listadoFavoritos = favoritos;
  //       for (let i = 0; i < this.listadoFavoritos.length;i++) {
  //         this.establecimientosJsonService.getEstablecimientoById(this.listadoFavoritos[i].id_establecimiento).subscribe(
  //           establecimientos => {
  //             // this.listadoFavoritosDetalles = establecimiento;
  //             const establecimiento: Establecimiento = establecimientos[0];
  //             this.listadoFavoritosDetalles.push(establecimiento);
  //             return;
  //           }
  //         );
  //       }
  //     }
  //   );
  //   // console.log(this.listadoFavoritosDetalles);
  // }

  public obtenerDatosEstablecimientosFavoritosApi(){
    this.establecimientoApi.getFavoritosByUserApi(parseInt(this.id,10)).subscribe(
      favoritos => {
        this.listadoFavoritos = favoritos;
        for (let i = 0; i < this.listadoFavoritos.length;i++) {
          this.establecimientoApi.getEstablecimientoApiById(this.listadoFavoritos[i].id_establecimiento).subscribe(
            establecimientos => {
              // this.listadoFavoritosDetalles = establecimiento;
              const establecimiento: EstablecimientoApi = establecimientos[0];
              this.listadoFavoritosDetalles.push(establecimiento);
              // console.log(this.listadoFavoritosDetalles);
              return;
            }
          );
        }
      }
    );
    // console.log(this.listadoFavoritosDetalles);
  }

  public deleteFavoritoApi(id_establecimiento: number) {
    // Buscar el favorito por id_usuario e id_establecimiento y guardar el id del favorito
    const favoritoEncontrado = this.listadoFavoritos.find(favorito => favorito.id_usuario === parseInt(this.id, 10) && favorito.id_establecimiento === id_establecimiento);

    let idFavoritoEncontrado = null;
    if (favoritoEncontrado) {
      idFavoritoEncontrado = favoritoEncontrado.id;
    }

    this.establecimientoApi.deleteFavoritoApi(idFavoritoEncontrado!).subscribe(
      (response) => {

        // Eliminar el establecimiento de listadoFavoritosDetalles
        const establecimientoIndex = this.listadoFavoritosDetalles.findIndex(establecimiento => establecimiento.id === id_establecimiento);
        if (establecimientoIndex !== -1) {
          this.listadoFavoritosDetalles.splice(establecimientoIndex, 1);
        }
        this.snackbar.open("Establecimiento eliminado de favoritos", "Cerrar",{duration: 2000,panelClass:['background']});
      },
      (error) => {
        this.snackbar.open("Error al eliminar el establecimiento", "Cerrar",{duration: 2000,panelClass:['background']});
      }
    );
  }

  // public eliminarFavorito(id_establecimiento: string) {
  //   console.log(this.listadoFavoritosDetalles);
  //   this.establecimientosJsonService.deleteFavorito((this.id),(id_establecimiento)).subscribe(
  //     (response) => {
  //       // Eliminar el favorito de listadoFavoritos
  //       const index = this.listadoFavoritos.findIndex(favorito => favorito.id_usuario === (this.id) && favorito.id_establecimiento === (id_establecimiento));
  //       console.log(index);
  //       if (index !== -1) {
  //         this.listadoFavoritos.splice(index, 1);
  //       }
  //       console.log(this.listadoFavoritos);
  //       // Eliminar el establecimiento de listadoFavoritosDetalles
  //       const establecimientoIndex = this.listadoFavoritosDetalles.findIndex(establecimiento => establecimiento.id === id_establecimiento);
  //       if (establecimientoIndex !== -1) {
  //         this.listadoFavoritosDetalles.splice(establecimientoIndex, 1);
  //       }
  //       console.log(this.listadoFavoritosDetalles);

        // this.snackbar.open("Establecimiento eliminado de favoritos", "Cerrar",{duration: 2000,panelClass:['background']});
  //     },
  //     (error) => {
  //       this.snackbar.open("Error al eliminar el establecimiento de favoritos", "Cerrar",{duration: 2000,panelClass:['background']});
  //     }
  //   );
  // }

  // public deleteFavorito(id_establecimiento: string) {
  //   // console.log(this.listadoFavoritos);
  //   // Eliminar el favorito de listadoFavoritos
  //   const index = this.listadoFavoritos.findIndex(favorito => favorito.id_usuario === this.id && favorito.id_establecimiento === id_establecimiento);
  //   // console.log(index);

  //   this.establecimientosJsonService.deleteFavorito(index.toString()).subscribe(
  //     (response) => {
  //       // Eliminar el favorito de listadoFavoritos
  //       this.listadoFavoritos.splice(index, 1);

  //       console.log(this.listadoFavoritos);
  //       // Eliminar el establecimiento de listadoFavoritosDetalles
  //       const establecimientoIndex = this.listadoFavoritosDetalles.findIndex(establecimiento => establecimiento.id === id_establecimiento);
  //       if (establecimientoIndex !== -1) {
  //         this.listadoFavoritosDetalles.splice(establecimientoIndex, 1);
  //       }
  //       console.log(this.listadoFavoritosDetalles);

  //       this.snackbar.open("Establecimiento eliminado de favoritos", "Cerrar",{duration: 2000,panelClass:['background']});
  //     },
  //     (error) => {
  //       this.snackbar.open("Error al eliminar el establecimiento de favoritos", "Cerrar",{duration: 2000,panelClass:['background']});
  //     }
  //   );

  // }


}
