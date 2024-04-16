import { Overlay } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Establecimiento } from 'src/app/interfaces/establecimiento.interface';
import { Zona } from 'src/app/interfaces/zona.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';
import { Favorito } from '../../interfaces/favorito.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';
import { EstablecimientoApi } from 'src/app/interfaces/establecimientoApi.interface';
import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';
import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';
import { FavoritoApi } from 'src/app/interfaces/favoritoApi.interface';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent {

  public establecimientoDetalles?: EstablecimientoApi;
  public listadoZonas: ZonaApi[] = [];
  public listadoCategorias: CategoriaApi[] = [];

  public idRol : string = '';
  public id : string = '';

  public esFavorito: boolean = false;
  public numFav: number = 0;

  constructor(
    private establecimientosJsonService: EstablecimientosJsonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private establecimientoApi: EstablecimientosApiService
  ){

  }

  public goToList(){
    this.router.navigate(['/establecimientos/list']);
  }

  public goToEdit(id: number){
    this.router.navigate([`/establecimientos/edit/${id}`]);
  }


  ngOnInit(): void {
    this.idRol = localStorage.getItem('idRol')!;
    this.id = localStorage.getItem('id')!;

    // this.verificarFavoritoApi(parseInt(this.id,10),this.establecimientoDetalles!.id);


    // this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientosJsonService.getEstablecimientoById(id) )  ).subscribe(  establecimiento =>
    //   {
    //     if (!establecimiento) return this.router.navigate(['/establecimientos/listado']);

    //     this.establecimientoDetalles = establecimiento[0];

    //     this.verificarFavorito(this.id,this.establecimientoDetalles.id);

    //     return;
    //   });

    //   this.establecimientosJsonService.getZonas().subscribe(zonas => {
    //     this.listadoZonas = zonas;
    //   });

    //   this.establecimientosJsonService.getCategorias().subscribe(categoria => {
    //     this.listadoCategorias = categoria;
    //   });

      this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientoApi.getEstablecimientoApiById(id) )  ).subscribe(  establecimiento =>
        {
          if (!establecimiento) return this.router.navigate(['/establecimientos/list']);

          this.establecimientoDetalles = establecimiento[0];

          this.verificarFavoritoApi(parseInt(this.id,10),this.establecimientoDetalles.id);

          return;
        });

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


  // public verificarFavorito(id_usuario: string, id_establecimiento: string) {

  //   this.establecimientosJsonService.getFavoritoByUserByName(id_usuario,id_establecimiento).subscribe(
  //     favoritos => {
  //       const favorito: Favorito = favoritos[0];
  //       if (favorito != undefined){
  //         this.esFavorito = true;
  //       }

  //     }
  //   );

  // }

  public verificarFavoritoApi(id_usuario: number, id_establecimiento: number) {

    this.establecimientoApi.getFavoritoByUserByNameApi(id_usuario,id_establecimiento).subscribe(
      favoritos => {
        const favorito: FavoritoApi = favoritos[0];

        if (favorito != undefined){
          this.esFavorito = true;
        }

      }
    );

  }

  //   public addFavorito(id_establecimiento: string) {
  //     // Obtener la lista de favoritos para determinar el máximo ID actual
  //     this.establecimientosJsonService.getFavoritos().subscribe(
  //         favoritos => {
  //             let maxId = 0;

  //             // Encontrar el máximo ID actual entre los favoritos existentes
  //             favoritos.forEach(favorito => {
  //                 const idNum =parseInt(favorito.id);
  //                 if (idNum > maxId) {
  //                     maxId = idNum;
  //                 }
  //             });

  //             // Generar el nuevo ID sumando 1 al máximo ID encontrado
  //             const nuevoId = (maxId + 1).toString();

  //             // Crear el objeto de favorito con el nuevo ID y los demás datos
  //             const nuevoFavorito: Favorito = {
  //                 id: nuevoId,
  //                 id_usuario: (this.id),
  //                 id_establecimiento: (id_establecimiento),
  //             };

  //             // Agregar el nuevo favorito utilizando el servicio correspondiente
  //             this.establecimientosJsonService.addFavorito(nuevoFavorito).subscribe(
  //                 (response) => {
  //                     this.snackbar.open("Establecimiento añadido de favoritos", "Cerrar", { duration: 2000, panelClass: ['background'] }).afterDismissed().subscribe(() => {
  //                         window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
  //                     });
  //                 },
  //                 (error) => {
  //                     this.snackbar.open("Error al añadir el establecimiento a favoritos", "Cerrar", { duration: 2000, panelClass: ['background'] }).afterDismissed().subscribe(() => {
  //                         window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
  //                     });
  //                 }
  //             );
  //         }
  //     );
  // }

  public addFavoritoApi(id_establecimiento: number) {

    const newFavorito: FavoritoApi = {
      id: 0,
      id_usuario: parseInt(this.id,10),
      id_establecimiento: id_establecimiento
    }

    this.establecimientoApi.addFavoritoApi(newFavorito).subscribe(
      repuesta => {
        this.snackbar.open("Establecimiento añadido de favoritos", "Cerrar", { duration: 2000, panelClass: ['background'] }).afterDismissed().subscribe(() => {
          window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
      });
      }
    );
  }


  // public eliminaFavorito(id_establecimiento: string) {

  //   this.establecimientosJsonService.deleteFavorito((this.id),(id_establecimiento)).subscribe(
  //     (response) => {
  //       this.snackbar.open("Establecimiento eliminado de favoritos", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
  //         window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
  //       });
  //     },
  //     (error) => {
  //       this.snackbar.open("Error al eliminar el establecimiento a favoritos", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
  //         window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
  //       });
  //     }
  //   );

  // }

  public eliminaFavoritoApi(id_establecimiento: number) {

    this.establecimientoApi.getFavoritoByUserByNameApi(parseInt(this.id,10),id_establecimiento).subscribe(
      favorito => {
        const fav = favorito[0];

        if (fav != undefined){
          this.establecimientoApi.deleteFavoritoApi(fav.id).subscribe(
            (response) => {
              this.snackbar.open("Establecimiento eliminado de favoritos", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
                window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
              });
            },
            (error) => {
              this.snackbar.open("Error al eliminar el establecimiento a favoritos", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
                window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
              });
            }
          );
        }else {
          this.snackbar.open("Error al eliminar el establecimiento a favoritos", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
            window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
          });
        }
      }
    );

  }


}
