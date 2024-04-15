import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Zona } from 'src/app/interfaces/zona.interface';
import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

@Component({
  selector: 'app-delete-zona',
  templateUrl: './delete-zona.component.html',
  styleUrls: ['./delete-zona.component.css']
})
export class DeleteZonaComponent {

  public nombre: string = '';

  public zonaSeleccionada!: ZonaApi;

  constructor(
    private establecimientosJsonService: EstablecimientosJsonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private establecimientosApi: EstablecimientosApiService
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientosApi.getZonaApiById(id) )  ).subscribe(  zona =>
      {
        if (!zona) return this.router.navigate(['admin/zonas']);
        this.zonaSeleccionada = zona[0];
        //Datos del formulario ya rellenos
        this.nombre  = this.zonaSeleccionada!.nombre;


        return;
      });


  }

  public cancelar() {
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
    this.nombre = '';
    this.router.navigate(['admin/zona/']);
  }

  public deleteZona() {
    this.establecimientosApi.deleteZonaApi(this.zonaSeleccionada.id).subscribe(
      (response) => {
        this.snackbar.open("Zona eliminada correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
          window.location.reload();
          this.nombre=''; // Recarga la página después de que el usuario cierre el Snackbar
        });
      },
      (error) => {
        this.snackbar.open("Ha ocurrido un error al eliminar la zona", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
          window.location.reload();
          this.nombre=''; // Recarga la página después de que el usuario cierre el Snackbar
        });
      }
    );

    this.router.navigate(['admin/zonas/']);
  }

}
