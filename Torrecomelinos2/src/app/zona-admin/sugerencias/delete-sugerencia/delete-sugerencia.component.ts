import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Sugerencia } from 'src/app/interfaces/sugerencia.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthJsonService } from 'src/app/services/authJson.service';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';

@Component({
  selector: 'app-delete-sugerencia',
  templateUrl: './delete-sugerencia.component.html',
  styleUrls: ['./delete-sugerencia.component.css']
})
export class DeleteSugerenciaComponent {

  public nombre: string = '';
  public usuario: string = '';

  public sugerenciaSeleccionada!: Sugerencia;
  public usuarioSeleccionado!: Usuario;

  constructor(
    private establecimientosJsonService: EstablecimientosJsonService,
    private authJsonService: AuthJsonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientosJsonService.getSugerenciaById(id) )  ).subscribe(  sugerencia =>
      {
        if (!sugerencia) return this.router.navigate(['admin/sugerencias/']);
        this.sugerenciaSeleccionada = sugerencia[0];
        //Datos del formulario ya rellenos
        this.nombre  = this.sugerenciaSeleccionada.nombre;

        this.authJsonService.getUserById(this.sugerenciaSeleccionada.id_usuario).subscribe(
          usuario => {
            this.usuarioSeleccionado = usuario[0];

            this.usuario = this.usuarioSeleccionado.email;

          }
        );


        return;
      });


  }

  public cancelar() {
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
    this.nombre = '';
    this.router.navigate(['admin/sugerencias/']);
  }

  public deleteSugerencia() {
    this.establecimientosJsonService.deleteSugerencia(this.sugerenciaSeleccionada.id).subscribe(
      (response) => {
        this.snackbar.open("Sugerencia eliminada correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
          window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
        });
      },
      (error) => {
        this.snackbar.open("Ha ocurrido un error al eliminar la sugerencia", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
          window.location.reload(); // Recarga la página después de que el usuario cierre el Snackbar
        });
      }
    );

    this.router.navigate(['admin/sugerencias/']);
  }

}
