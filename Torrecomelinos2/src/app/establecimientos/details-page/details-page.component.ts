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

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent {

  public establecimientoDetalles?: Establecimiento;
  public listadoZonas: Zona[] = [];
  public listadoCategorias: Categoria[] = [];

  public idRol : string = '';
  public id : string = '';

  constructor(
    private establecimientosJsonService: EstablecimientosJsonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){

  }

  public goToList(){
    this.router.navigate(['/establecimientos/list']);
  }

  public goToEdit(id: string){
    this.router.navigate([`/establecimientos/edit/${id}`]);
  }


  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientosJsonService.getEstablecimientoById(id) )  ).subscribe(  establecimiento =>
      {
        if (!establecimiento) return this.router.navigate(['/establecimientos/listado']);

        this.establecimientoDetalles = establecimiento[0];

        return;
      });

      this.establecimientosJsonService.getZonas().subscribe(zonas => {
        this.listadoZonas = zonas;
      });

      this.establecimientosJsonService.getCategorias().subscribe(categoria => {
        this.listadoCategorias = categoria;
      });

    this.idRol = localStorage.getItem('idRol')!;
    this.id = localStorage.getItem('id')!;

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

  // verificarFavorito(): number {
  //   let ok = 0;

  //   this.establecimientosJsonService.getFavoritoByUserByName(this.id,this.establecimientoDetalles!.id).subscribe(
  //     favoritos => {
  //       const favorito: Favorito = favoritos[0];

  //       if (favorito != undefined) {
  //         ok = 1;
  //       }else {
  //         ok = 0;
  //       }
  //     }
  //   );
  //   return ok;
  // }


}
