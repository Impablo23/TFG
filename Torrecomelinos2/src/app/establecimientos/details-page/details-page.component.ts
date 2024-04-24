import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { EstablecimientoApi } from 'src/app/interfaces/establecimientoApi.interface';
import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';
import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';
import { FavoritoApi } from 'src/app/interfaces/favoritoApi.interface';
import { AuthApiService } from 'src/app/services/authApi.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent {

  // Variable para almacenar los datos del establecimiento seleccionado
  public establecimientoDetalles!: EstablecimientoApi;

  // Variables para almacenar los datos de las zonas y categorías de los establecimientos
  public listadoZonas: ZonaApi[] = [];
  public listadoCategorias: CategoriaApi[] = [];

  // Variables para almacenar los datos del rol e id del usuario
  public idRol : number = 0;
  public id : number = 0;

  // Variables para almacenar si esta o no en favoritos y el numero de favoritos del usuario
  public esFavorito: boolean = false;
  public numFav: number = 0;

  public token : string = "";

  // Constructor
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private establecimientoApi: EstablecimientosApiService,
    private authApi: AuthApiService
  ){}

  // Método que redirige hacia el listado de establecimientos
  public goToList(){
    this.router.navigate(['/establecimientos/list']);
  }

  // Método que redirige hacia la edicion de un establecimiento determinado
  public goToEdit(id: number){
    this.router.navigate([`/establecimientos/edit/${id}`]);
  }

  // Método que al iniciar la página, recoge los datos del establecimiento seleccionado y los almacena en el formulario y almacena en los listados las zonas y categorias
  async ngOnInit(): Promise<void> {
    const usuario = this.authApi.getUserConectado()!;

    // Obtener token API
    this.token = this.authApi.getTokenUserConectado();

    this.id = usuario.id;
    this.idRol = usuario.idRol;

    // Obtener zonas
    const responseZonas= await this.establecimientoApi.getZonasApi(this.token).toPromise();
    this.listadoZonas = responseZonas!;

    // Obtener categorías
    const responseCategorias= await this.establecimientoApi.getCategoriasApi(this.token).toPromise();
    this.listadoCategorias = responseCategorias!;


    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientoApi.getEstablecimientoApiById(id,this.token) )  ).subscribe(  establecimiento =>
      {
        if (!establecimiento) return this.router.navigate(['/establecimientos/list']);

        this.establecimientoDetalles = establecimiento[0];

        this.verificarFavoritoApi(this.id,this.establecimientoDetalles.id);

        return;
      }
    );


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

  // Método para alternar el corazon en rojo o gris dependiendo de si está el establecimiento seleccionado en los favoritos del usuario
  public verificarFavoritoApi(id_usuario: number, id_establecimiento: number) {

    this.establecimientoApi.getFavoritoByUserByNameApi(id_usuario,id_establecimiento,this.token).subscribe(
      favoritos => {
        const favorito: FavoritoApi = favoritos[0];

        if (favorito != undefined){
          this.esFavorito = true;
        }

      }
    );

  }

  // Método para añadir el establecimiento en los favoritos del usuario
  public addFavoritoApi(id_establecimiento: number) {

    const newFavorito: FavoritoApi = {
      id: 0,
      id_usuario: this.id,
      id_establecimiento: id_establecimiento
    }

    this.establecimientoApi.addFavoritoApi(newFavorito,this.token).subscribe(
      repuesta => {
        this.snackbar.open("Establecimiento añadido de favoritos", "Cerrar", { duration: 2000, panelClass: ['background'] }).afterDismissed().subscribe(() => {
          // window.location.reload();
        });
        this.esFavorito = true;
      }
    );
  }

  // Método que verifica que el favorito que se va a eliminar exista y si es asi se elimina de la BBDD notificando al usuario de la confirmacion de la eliminacion
  public eliminaFavoritoApi(id_establecimiento: number) {

    this.establecimientoApi.getFavoritoByUserByNameApi(this.id,id_establecimiento,this.token).subscribe(
      favorito => {
        const fav = favorito[0];

        if (fav != undefined){
          this.establecimientoApi.deleteFavoritoApi(fav.id,this.token).subscribe(
            (response) => {
              this.snackbar.open("Establecimiento eliminado de favoritos", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
                // window.location.reload();
              });
              this.esFavorito = false;
            },
            (error) => {
              this.snackbar.open("Error al eliminar el establecimiento a favoritos", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
                // window.location.reload();
              });
            }
          );
        }else {
          this.snackbar.open("Error al eliminar el establecimiento a favoritos", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
            // window.location.reload();
          });
        }
      }
    );

  }


}
