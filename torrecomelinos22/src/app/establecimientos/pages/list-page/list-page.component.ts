import { Component } from '@angular/core';
import { Establecimiento } from 'src/app/interfaces/establecimiento.interface';
import { EstablecimientosJsonService } from '../../../services/establecimientos.service';
import { Zona } from 'src/app/interfaces/zona.interface';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Router } from '@angular/router';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent {

  constructor(private establecimientosService: EstablecimientosJsonService,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay,){}

  public listadoEstablecimientos: Establecimiento[] = [];
  public listadoZonas: Zona[] = [];
  public listadoCategorias: Categoria[] = [];

  ngOnInit(): void {
    this.establecimientosService.getEstablecimientos().subscribe(listado => {
      this.listadoEstablecimientos = listado;
    });

    this.establecimientosService.getZonas().subscribe(zonas => {
      this.listadoZonas = zonas;
    });

    this.establecimientosService.getCategorias().subscribe(categoria => {
      this.listadoCategorias = categoria;
    });

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

  navigateToDetails(id: number): void {
    this.router.navigate([`establecimientos/detalles/${id}`]);
  }

  evitarErrorEnFoto(foto: string): string {
    if (foto.length === 0) {
      return 'assets/no_foto.png';
    }else{
      return foto;
    }
  }

  async deleteEstablecimiento(establecimiento: Establecimiento) {
    const dialogRef = this.dialog.open(DialogComponent, { data:establecimiento, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      this.establecimientosService.deleteEstablecimiento(establecimiento.id).subscribe( resultado => {console.log(resultado)});
      this.listadoEstablecimientos = this.listadoEstablecimientos.filter(item => item !== establecimiento);
      this.router.navigate(['/establecimientos'])
    }
  }

}
