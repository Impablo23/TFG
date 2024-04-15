import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Establecimiento } from 'src/app/interfaces/establecimiento.interface';
import { EstablecimientoApi } from 'src/app/interfaces/establecimientoApi.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

@Component({
  selector: 'app-delete-page',
  templateUrl: './delete-page.component.html',
  styleUrls: ['./delete-page.component.css']
})
export class DeletePageComponent {

  public establecimientoDetalles?: EstablecimientoApi;
  public idEstablecimiento: number = 0;
  public nombreEstablecimiento: string = '';

  constructor(
    private establecimientosJsonService: EstablecimientosJsonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private establecimientoApi: EstablecimientosApiService
  ){}

  public goToList(){
    this.router.navigate(['/establecimientos/list']);
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientoApi.getEstablecimientoApiById(id) )  ).subscribe(  establecimiento =>
      {
        if (!establecimiento) return this.router.navigate(['/establecimientos/list']);

        this.establecimientoDetalles = establecimiento[0];

        this.idEstablecimiento = establecimiento[0].id;
        this.nombreEstablecimiento = establecimiento[0].nombre;

        return;
      });




  }

  // public deleteEstablecimiento(id: string) {

  //   this.establecimientosJsonService.deleteEstablecimiento(id.toString()).subscribe(
  //     (response) => {
  //       this.snackbar.open("Establecimiento eliminado correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
  //       this.router.navigate([`/establecimientos/list`])
  //     },
  //     (error) => {
  //       this.snackbar.open("Error al eliminar el establecimiento", "Cerrar",{duration: 2000,panelClass:['background']});
  //       this.router.navigate([`/establecimientos/list`])
  //     }
  //   );

  // }

  public deleteEstablecimientoApi(id: number) {

    this.establecimientoApi.deleteEstablecimientoApi(id).subscribe(
      (response) => {
        this.snackbar.open("Establecimiento eliminado correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
        this.router.navigate([`/establecimientos/list`])
      },
      (error) => {
        this.snackbar.open("Error al eliminar el establecimiento", "Cerrar",{duration: 2000,panelClass:['background']});
        this.router.navigate([`/establecimientos/list`])
      }
    );

  }

}
