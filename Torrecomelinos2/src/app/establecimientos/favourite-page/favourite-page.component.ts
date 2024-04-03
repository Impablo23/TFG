import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Establecimiento } from 'src/app/interfaces/establecimiento.interface';
import { Favorito } from 'src/app/interfaces/favorito.interface';
import { Zona } from 'src/app/interfaces/zona.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';

@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourite-page.component.html',
  styleUrls: ['./favourite-page.component.css']
})
export class FavouritePageComponent {

  public id : string = '';

  public listadoFavoritos : Favorito[] = [];
  public listadoFavoritosDetalles : Establecimiento[] = [];
  public listadoZonas: Zona[] = [];
  public listadoCategorias: Categoria[] = [];

  constructor(
    private establecimientosJsonService: EstablecimientosJsonService,
    private snackbar: MatSnackBar
  ){}

  ngOnInit() {
    this.id = localStorage.getItem('id')!;

    this.establecimientosJsonService.getZonas().subscribe(zonas => {
      this.listadoZonas = zonas;
    });

    this.establecimientosJsonService.getCategorias().subscribe(categoria => {
      this.listadoCategorias = categoria;
    });
    // this.listadoFavoritos = [];
    // this.listadoFavoritosDetalles = [];
    this.obtenerDatosEstablecimientosFavoritos();

    // console.log(this.listadoFavoritosDetalles);
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

  evitarErrorEnFoto(foto: string): string {
    if (foto.length === 0) {
      return 'assets/no_foto.png';
    }else{
      return foto;
    }
  }

  public obtenerDatosEstablecimientosFavoritos(){
    this.establecimientosJsonService.getFavoritosByUser(this.id).subscribe(
      favoritos => {
        this.listadoFavoritos = favoritos;
        for (let i = 0; i < this.listadoFavoritos.length;i++) {
          this.establecimientosJsonService.getEstablecimientoById(this.listadoFavoritos[i].id_establecimiento).subscribe(
            establecimientos => {
              // this.listadoFavoritosDetalles = establecimiento;
              const establecimiento: Establecimiento = establecimientos[0];
              this.listadoFavoritosDetalles.push(establecimiento);
              return;
            }
          );
        }
      }
    );
    // console.log(this.listadoFavoritosDetalles);
  }

  public eliminarFavorito(id_establecimiento: string) {
    this.establecimientosJsonService.deleteFavorito(parseInt(this.id,10),parseInt(id_establecimiento,10)).subscribe(
      (response) => {
        // Eliminar el favorito de listadoFavoritos
        const index = this.listadoFavoritos.findIndex(favorito => favorito.id_usuario === parseInt(this.id,10) && favorito.id_establecimiento === parseInt(id_establecimiento,10));
        console.log(index);
        if (index !== -1) {
          this.listadoFavoritos.splice(index, 1);
        }
        console.log(this.listadoFavoritos);
        // Eliminar el establecimiento de listadoFavoritosDetalles
        const establecimientoIndex = this.listadoFavoritosDetalles.findIndex(establecimiento => establecimiento.id === id_establecimiento);
        if (establecimientoIndex !== -1) {
          this.listadoFavoritosDetalles.splice(establecimientoIndex, 1);
        }
        console.log(this.listadoFavoritosDetalles);

        this.snackbar.open("Establecimiento eliminado de favoritos", "Cerrar",{duration: 2000,panelClass:['background']});
      },
      (error) => {
        this.snackbar.open("Error al eliminar el establecimiento de favoritos", "Cerrar",{duration: 2000,panelClass:['background']});
      }
    );
  }

}
