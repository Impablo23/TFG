import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Zona } from 'src/app/interfaces/zona.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';

@Component({
  selector: 'app-delete-zona',
  templateUrl: './delete-zona.component.html',
  styleUrls: ['./delete-zona.component.css']
})
export class DeleteZonaComponent {

  public nombre: string = '';

  public zonaSeleccionada!: Zona;

  constructor(
    private establecimientosJsonService: EstablecimientosJsonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientosJsonService.getZonaById(id) )  ).subscribe(  zona =>
      {
        if (!zona) return this.router.navigate(['/zona']);
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
    this.establecimientosJsonService.deleteZona(this.zonaSeleccionada.id).subscribe(
      (response) => {
        // console.log('perita');
        window.location.reload();
        this.snackbar.open("Zona eliminada correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
      },
      (error) => {
        // console.log('mal');
        window.location.reload();
        this.snackbar.open("Ha ocurrido un error al eliminar la zona", "Cerrar",{duration: 2000,panelClass:['background']});
      }
    );

    this.router.navigate(['admin/zonas/']);
  }

}
