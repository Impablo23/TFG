import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Sugerencia } from 'src/app/interfaces/sugerencia.interface';
import { SugerenciaApi } from 'src/app/interfaces/sugerenciaApi.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';
import { AuthApiService } from 'src/app/services/authApi.service';
import { AuthJsonService } from 'src/app/services/authJson.service';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

@Component({
  selector: 'app-add-sugerencia',
  templateUrl: './add-sugerencia.component.html',
  styleUrls: ['./add-sugerencia.component.css']
})
export class AddSugerenciaComponent {

  public nombre: string = '';
  public usuario: string = '';

  public sugerenciaSeleccionada!: SugerenciaApi;
  public usuarioSeleccionado!: UsuarioApi;

  constructor(
    private establecimientosJsonService: EstablecimientosJsonService,
    private authJsonService: AuthJsonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private establecimientosApi: EstablecimientosApiService,
    private authApi: AuthApiService
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.establecimientosApi.getSugerenciaApiById(id) )  ).subscribe(  sugerencia =>
      {
        if (!sugerencia) return this.router.navigate(['admin/sugerencias/']);
        this.sugerenciaSeleccionada = sugerencia[0];
        //Datos del formulario ya rellenos
        this.nombre  = this.sugerenciaSeleccionada.nombre;

        this.authApi.getUsersApiById(this.sugerenciaSeleccionada.id_usuario).subscribe(
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

  // public addSugerencia() {
  //   this.router.navigate(['establecimientos', 'add'], { queryParams: { sugerenciaId: this.sugerenciaSeleccionada.id } });

  //   this.establecimientosJsonService.getEstablecimientosByName(this.sugerenciaSeleccionada.nombre).subscribe(
  //     establecimientos => {
  //       if (establecimientos[0] !== undefined) {
  //         this.establecimientosJsonService.deleteSugerencia(this.sugerenciaSeleccionada.id).subscribe(
  //           (response) => {
  //             console.log('perfee jay')
  //           },
  //           (error) => {
  //             console.log("nanai");
  //           }
  //         );
  //       }
  //     }
  //   );

  // }

  public addSugerenciaApi() {
    this.router.navigate(['establecimientos', 'add'], { queryParams: { sugerenciaId: this.sugerenciaSeleccionada.id } });

    this.establecimientosApi.getEstablecimientosApiByName(this.sugerenciaSeleccionada.nombre).subscribe(
      establecimientos => {
        console.log(establecimientos);
        if (establecimientos[0] !== undefined) {
          this.establecimientosApi.deleteSugerenciaApi(this.sugerenciaSeleccionada.id).subscribe(
            (response) => {
              console.log('perfee jay')
            },
            (error) => {
              console.log("nanai");
            }
          );
        }
      }
    );

  }

}
