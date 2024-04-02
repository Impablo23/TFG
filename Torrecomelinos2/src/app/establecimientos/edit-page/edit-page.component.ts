import { Overlay } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Establecimiento } from 'src/app/interfaces/establecimiento.interface';
import { Zona } from 'src/app/interfaces/zona.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent {

  public establecimientoDetalles?: Establecimiento;
  public listadoZonas: Zona[] = [];
  public listadoCategorias: Categoria[] = [];

  // public idRol : string = '';



  public nombre: string = 'efwfd';
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ){

  }


  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientosJsonService.getEstablecimientoById(id) )  ).subscribe(  establecimiento =>
      {
        if (!establecimiento) return this.router.navigate(['/establecimientos/list']);

        this.establecimientoDetalles = establecimiento[0];
        //Datos del formulario ya rellenos
        this.nombre  = this.establecimientoDetalles!.nombre;
        this.descripcion  = this.establecimientoDetalles!.descripcion;
        this.direccion  = this.establecimientoDetalles!.direccion;
        this.telefono  = this.establecimientoDetalles!.telefono;
        this.foto  = this.establecimientoDetalles!.foto;
        this.enlace  = this.establecimientoDetalles!.enlace;
        this.numResenas  = this.establecimientoDetalles!.numResenas;
        this.id_zona = this.establecimientoDetalles!.id_zona;
        this.id_categoria = this.establecimientoDetalles!.id_categoria;

        return;
      });

      this.establecimientosJsonService.getZonas().subscribe(zonas => {
        this.listadoZonas = zonas;
      });

      this.establecimientosJsonService.getCategorias().subscribe(categoria => {
        this.listadoCategorias = categoria;
      });

    // this.idRol = localStorage.getItem('idRol')!;

  }

  public goToDetails(id: string){
    this.router.navigate([`/establecimientos/details/${id}`]);
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

  public editarEstablecimiento() {
    // const contador: number = 14;
    const establecimientoEditado: Establecimiento = {
      id: this.establecimientoDetalles!.id.toString(),
      nombre: this.nombre,
      descripcion: this.descripcion,
      numResenas: this.numResenas,
      direccion: this.direccion,
      telefono: this.telefono,
      foto: this.foto,
      enlace: this.enlace,
      id_zona: parseInt(this.id_zona.toString()),
      id_categoria: parseInt(this.id_categoria.toString())
    }

    // console.log(establecimientoEditado);

    if (this.nombre.length === 0 ) {
      this.snackbar.open("Es obligatorio rellenar el nombre del establecimiento", "Cerrar",{duration: 2000,panelClass:['background']});
      return;
    }

    this.establecimientosJsonService.updateEstablecimiento(establecimientoEditado).subscribe(
      (response) => {
        // console.log('perita');
        this.snackbar.open("Establecimiento actualizado correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
        this.router.navigate([`/establecimientos/details/${establecimientoEditado.id}`])
      },
      (error) => {
        // console.log('mal');
        this.snackbar.open("Ha ocurrido un error al actualizar el establecimiento", "Cerrar",{duration: 2000,panelClass:['background']});
      }
    )

  }


}



