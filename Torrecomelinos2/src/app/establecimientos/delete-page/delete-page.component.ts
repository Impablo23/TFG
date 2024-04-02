import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Establecimiento } from 'src/app/interfaces/establecimiento.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';

@Component({
  selector: 'app-delete-page',
  templateUrl: './delete-page.component.html',
  styleUrls: ['./delete-page.component.css']
})
export class DeletePageComponent {

  public establecimientoDetalles?: Establecimiento;
  public idEstablecimiento: string = '';
  public nombreEstablecimiento: string = '';

  constructor(
    private establecimientosJsonService: EstablecimientosJsonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ){}

  public goToList(){
    this.router.navigate(['/establecimientos/list']);
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientosJsonService.getEstablecimientoById(id) )  ).subscribe(  establecimiento =>
      {
        if (!establecimiento) return this.router.navigate(['/establecimientos/listado']);

        this.establecimientoDetalles = establecimiento[0];

        this.idEstablecimiento = establecimiento[0].id;
        this.nombreEstablecimiento = establecimiento[0].nombre;

        return;
      });




  }

  public deleteEstablecimiento(id: string) {

    this.establecimientosJsonService.deleteEstablecimiento(id.toString()).subscribe(
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
