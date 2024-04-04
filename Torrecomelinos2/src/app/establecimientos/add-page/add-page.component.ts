import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Establecimiento } from 'src/app/interfaces/establecimiento.interface';
import { Zona } from 'src/app/interfaces/zona.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent {

  // public establecimientoDetalles?: Establecimiento;
  public listadoZonas: Zona[] = [];
  public listadoCategorias: Categoria[] = [];

  public numEstablecimientos: number = 0;

  // public idRol : string = '';


  public nombre: string = '';
  public descripcion: string = '';
  public direccion: string = '';
  public telefono: string = '';
  public foto: string = '';
  public enlace: string = '';
  public numResenas: number = 0;
  public id_zona: number = 0;
  public id_categoria: number = 0;


  constructor(
    private establecimientosJsonService: EstablecimientosJsonService,
    // private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ){

  }


  ngOnInit(): void {
    // this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientosJsonService.getEstablecimientoById(id) )  ).subscribe(  establecimiento =>
    //   {
    //     if (!establecimiento) return this.router.navigate(['/establecimientos/list']);

    //     this.establecimientoDetalles = establecimiento[0];

    //     return;
    //   });

      this.establecimientosJsonService.getZonas().subscribe(zonas => {
        this.listadoZonas = zonas;
      });

      this.establecimientosJsonService.getCategorias().subscribe(categoria => {
        this.listadoCategorias = categoria;
      });

    // this.idRol = localStorage.getItem('idRol')!;

  }

  public goToList(){
    this.router.navigate([`/establecimientos/list`]);
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


  public addEstablecimiento() {

    this.establecimientosJsonService.getEstablecimientos().subscribe(establecimientos => {

      this.numEstablecimientos = establecimientos.length;

      const establecimientoEditado: Establecimiento = {
        id: (this.numEstablecimientos+1).toString(),
        id_zona: parseInt(this.id_zona.toString()),
        id_categoria: parseInt(this.id_categoria.toString()),
        nombre: this.nombre,
        descripcion: this.descripcion,
        numResenas: this.numResenas,
        direccion: this.direccion,
        telefono: this.telefono,
        foto: this.foto,
        enlace: this.enlace,
      }

      if (this.nombre.length === 0 ) {
        this.snackbar.open("Es obligatorio rellenar el nombre del establecimiento", "Cerrar",{duration: 2000,panelClass:['background']});
        return;
      }

      this.establecimientosJsonService.addEstablecimiento(establecimientoEditado).subscribe(
        (response) => {
          // console.log('perita');
          this.snackbar.open("Establecimiento añadido correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
          this.router.navigate([`/establecimientos/list`])
          // contador= contador+1;
        },
        (error) => {
          // console.log('mal');
          this.snackbar.open("Ha ocurrido un error al añadir el establecimiento", "Cerrar",{duration: 2000,panelClass:['background']});
        }
      )
    });

  }

}
