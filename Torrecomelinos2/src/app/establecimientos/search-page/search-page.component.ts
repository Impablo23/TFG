import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EstablecimientosJsonService } from '../../services/establecimientos.service';
import { Establecimiento } from 'src/app/interfaces/establecimiento.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Zona } from 'src/app/interfaces/zona.interface';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Router } from '@angular/router';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { EstablecimientoApi } from 'src/app/interfaces/establecimientoApi.interface';
import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent  implements OnInit {

  public establecimientosEncontrados : EstablecimientoApi[] = [];
  public establecimientos : EstablecimientoApi[] = [];
  public listadoZonas: ZonaApi[] = [];
  // public listadoCategorias: CategoriaA[] = [];

  public valorBusqueda: string = '';

  constructor(private establecimientosJsonService: EstablecimientosJsonService,
    private snackbar: MatSnackBar,
    private router: Router,
    private establecimientoApi: EstablecimientosApiService
  ){}

  ngOnInit(): void {

    this.searchForm.get('searchInput')!.valueChanges
      .pipe(
        debounceTime(300), // Esperar 300 milisegundos después de que el usuario deje de escribir
        distinctUntilChanged() // No realizar la búsqueda si el término no ha cambiado
      )
      .subscribe(valor => {
        if (!valor.trim()) {
          this.establecimientosEncontrados = [];
          return; // No realizar la búsqueda si el término está vacío
        }
        this.cargarEstablecimientos(valor);
      });

      this.establecimientoApi.getZonasApi().subscribe(
        zonas => {
          this.listadoZonas = zonas
        }
      );

    // this.establecimientosJsonService.getCategorias().subscribe(categoria => {
    //   this.listadoCategorias = categoria;
    // });

    this.obtenerEstablecimientos();

  }

  public obtenerEstablecimientos() {
    this.establecimientoApi.getEstablecimientosApi().subscribe(
      respuesta => {this.establecimientos=respuesta;
      // console.log(this.establecimientos);
    }
    );
  }

  public searchForm: FormGroup = new FormGroup({
    searchInput: new FormControl(''),
  });



  // public searchEstablecimiento(){
  //   const valor: string = this.searchForm.get('searchInput')!.value;
  //   if (!valor.trim()) {
  //     return; // No realizar la búsqueda si el término está vacío
  //   }

  //   this.cargarEstablecimientos(valor);
  // }

  public cargarEstablecimientos(valor: string) {

    this.establecimientosEncontrados = this.establecimientos.filter(establecimiento =>
      establecimiento.nombre.includes(valor)
    );

    if (this.establecimientosEncontrados.length === 0){
      this.snackbar.open("No se han encontrado resultados de "+valor, "Cerrar",{duration: 2000,panelClass:['background']})
    }else {
      this.snackbar.open("Resultados de "+valor, "Cerrar",{duration: 2000,panelClass:['background']})
    }



    // console.log(this.establecimientosEncontrados);


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

  // obtenerNombreCategoria(idCategoria: string): string {
  //   let nombre:string = '';
  //   for (const categoria of this.listadoCategorias) {
  //     // console.log(zona.id);
  //     // console.log(zona.nombre);
  //     if (categoria.id == idCategoria) {
  //       nombre = categoria.nombre
  //     }
  //   }
  //   return nombre;
  // }


  evitarErrorEnFoto(foto: string): string {
    if (foto.length === 0) {
      return 'assets/no_foto.png';
    }else{
      return foto;
    }
  }

  navigateToDetails(id: number): void {
    this.router.navigate([`establecimientos/details/${id}`]);
  }

  reseteo () {
    this.searchForm.get('searchInput')!.setValue('');
  }
}
