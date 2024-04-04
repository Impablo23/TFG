import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EstablecimientosJsonService } from '../../services/establecimientos.service';
import { Establecimiento } from 'src/app/interfaces/establecimiento.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Zona } from 'src/app/interfaces/zona.interface';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent  implements OnInit {

  public establecimientosEncontrados : Establecimiento[] = [];
  public establecimientos : Establecimiento[] = [];
  public listadoZonas: Zona[] = [];
  public listadoCategorias: Categoria[] = [];

  constructor(private establecimientosJsonService: EstablecimientosJsonService, private snackbar: MatSnackBar,private router: Router){}

  ngOnInit(): void {

    this.establecimientosJsonService.getZonas().subscribe(zonas => {
      this.listadoZonas = zonas;
    });

    this.establecimientosJsonService.getCategorias().subscribe(categoria => {
      this.listadoCategorias = categoria;
    });

    this.obtenerEstablecimientos();

  }

  public obtenerEstablecimientos() {
    this.establecimientosJsonService.getEstablecimientos().subscribe(
      respuesta => {this.establecimientos=respuesta;
      // console.log(this.establecimientos);
    }
    );
  }

  public searchForm: FormGroup = new FormGroup({
    searchInput: new FormControl(''),
  });



  public searchEstablecimiento(){
    const valor: string = this.searchForm.get('searchInput')!.value;
    if (!valor.trim()) {
      return; // No realizar la búsqueda si el término está vacío
    }

    this.cargarEstablecimientos(valor);
  }

  public cargarEstablecimientos(valor: string) {

    this.establecimientosEncontrados = this.establecimientos.filter(establecimiento =>
      establecimiento.nombre.includes(valor)
    );

    if (this.establecimientosEncontrados.length === 0){
      this.snackbar.open("No se han encontrado resultados de "+valor, "Cerrar",{duration: 2000,panelClass:['background']})
    }else {
      this.snackbar.open("Resultados de "+valor, "Cerrar",{duration: 2000,panelClass:['background']})
    }

    this.searchForm.get('searchInput')!.setValue('');

    // console.log(this.establecimientosEncontrados);


  }


  obtenerNombreZona(idZona: string): string {
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

  obtenerNombreCategoria(idCategoria: string): string {
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

  navigateToDetails(id: string): void {
    this.router.navigate([`establecimientos/details/${id}`]);
  }
}
