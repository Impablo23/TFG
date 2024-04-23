import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { EstablecimientoApi } from 'src/app/interfaces/establecimientoApi.interface';
import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent  implements OnInit {

  // Variables para guardar los datos de los establecimientos,todos y lo que busca el usuario, y de las zonas de cada establecimiento
  public establecimientosEncontrados : EstablecimientoApi[] = [];
  public establecimientos : EstablecimientoApi[] = [];
  public listadoZonas: ZonaApi[] = [];

  // Variable donde se almacena el valor de la busqueda del usuario
  public valorBusqueda: string = '';

  // Constructor
  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private establecimientoApi: EstablecimientosApiService
  ){}

  public tokenApi : string = "";
  /*
    Aqui cargamos en el listado de los establecimientos de los nombres de los establecimientos que incluyen los caracteres que introduce el usuario
    para asi mostrarlos y cargamos las zonas.
  */
  async ngOnInit(): Promise<void> {

    this.tokenApi = localStorage.getItem('tokenApi')!;

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

      // Obtener zonas
      const responseZonas= await this.establecimientoApi.getZonasApi(this.tokenApi).toPromise();
      this.listadoZonas = responseZonas!;


    this.obtenerEstablecimientos();

  }

  // Método que recoge todos los establecimientos para hacer la busqueda de los solicitados
  public async obtenerEstablecimientos() {
   // Obtener establecimientos
    const responseEstablecimientos = await this.establecimientoApi.getEstablecimientosApi(this.tokenApi).toPromise();
    this.establecimientos = responseEstablecimientos!;

  }

  // Formulario para el buscador de establecimientos
  public searchForm: FormGroup = new FormGroup({
    searchInput: new FormControl(''),
  });

  // Método que guarda en una lista los establecimientos que incluyen los caracteres escritos en el buscador y le notifica de si hay resultado o no.
  public cargarEstablecimientos(valor: string) {

    this.establecimientosEncontrados = this.establecimientos.filter(establecimiento =>
      establecimiento.nombre.includes(valor)
    );

    if (this.establecimientosEncontrados.length === 0){
      this.snackbar.open("No se han encontrado resultados de "+valor, "Cerrar",{duration: 2000,panelClass:['background']})
    }else {
      this.snackbar.open("Resultados de "+valor, "Cerrar",{duration: 2000,panelClass:['background']})
    }

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

  // Método para evitar de que la foto de establecimiento salga vacía y se le pone una estándar.
  evitarErrorEnFoto(foto: string): string {
    if (foto.length === 0) {
      return 'assets/no_foto.png';
    }else{
      return foto;
    }
  }

  // Método para redirigir a la pagina de detalles del establecimiento seleccionado
  navigateToDetails(id: number): void {
    this.router.navigate([`establecimientos/details/${id}`]);
  }

  // Método para cada vez de que el usuario pulse enter se borran los datos del buscador
  reseteo () {
    this.searchForm.get('searchInput')!.setValue('');
  }
}
