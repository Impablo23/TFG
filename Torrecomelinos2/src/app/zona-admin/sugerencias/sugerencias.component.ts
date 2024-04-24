import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { SugerenciaApi } from 'src/app/interfaces/sugerenciaApi.interface';
import { Subscription } from 'rxjs';
import { AuthApiService } from 'src/app/services/authApi.service';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css']
})
export class SugerenciasComponent {

  private sugerenciasSubscription!: Subscription;

  // Variable que almacena las segurencias recogidad de la BBDD.
  public listadoSugerencias: SugerenciaApi[] = [];

  public token: string = '';

  // Constructor
  constructor(
    public router: Router,
    private establecimientosApi: EstablecimientosApiService,
    private authApi: AuthApiService
  ){}

  // Método que al iniciar la página, almacena las sugerencias de la BBDD en el listado de sugerencias
  async ngOnInit(){

    try {

      this.token = this.authApi.getTokenUserConectado();

      // Obten las zonas al iniciar el componente
      await this.obtenerSugerencias();
    } catch (error) {
      console.error('Error en ngOnInit:', error);
      // Manejar el error según sea necesario
    }

  }


  ngOnDestroy() {
    // Desuscribe la suscripción al salir del componente para evitar posibles fugas de memoria
    this.sugerenciasSubscription.unsubscribe();
  }

  obtenerSugerencias() {
    // Suscríbete al observable para obtener las actualizaciones del listado de categorías
    this.sugerenciasSubscription = this.establecimientosApi.sugerencias$.subscribe(sugerencias => {
      this.listadoSugerencias = sugerencias;
    });

    // Obten las categorías al iniciar el componente
    this.establecimientosApi.getSugerenciasApi(this.token).subscribe();
  }

  // Método que almacena las sugerencias recogidas de la BBDD y las guarda en el listado de sugerencias
  // public listarSugerencias(){
  //   this.establecimientosApi.getSugerenciasApi().subscribe(
  //     sugerencias => {
  //       this.listadoSugerencias = sugerencias;
  //     }
  //   );
  // }

  // Método que redirige a la inserccion de sugerencia seleccionada
  public goToAddSugerencia(id: number) {
    this.router.navigate(['admin/sugerencias/add', id]);
  }

  // Método que redirige a la elimnacion de sugerencia seleccionada
  public goToDeleteSugerencia(id: number) {
    this.router.navigate(['admin/sugerencias/delete', id]);
  }

}
