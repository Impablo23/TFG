import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';
import { Subscription } from 'rxjs';
import { AuthApiService } from 'src/app/services/authApi.service';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent {

  private zonasSubscription!: Subscription;

  public tokenApi : string = "";

  // Variable para almacenar las zonas recogidad de la BBDD
  public listadoZonas: ZonaApi[] = [];

  // Constructor
  constructor(
    public router: Router,
    private establecimientosApi: EstablecimientosApiService,
    private authApi: AuthApiService
  ){}

  // Método que al iniciar la página, se cargar las zonas.
  async ngOnInit() {
    try {

      this.tokenApi = sessionStorage.getItem('tokenApi')!;

      // Obten las zonas al iniciar el componente
      await this.obtenerZonas();
    } catch (error) {
      console.error('Error en ngOnInit:', error);
      // Manejar el error según sea necesario
    }
  }


  ngOnDestroy() {
    // Desuscribe la suscripción al salir del componente para evitar posibles fugas de memoria
    this.zonasSubscription.unsubscribe();
  }

  async obtenerZonas() {
    try {
      // Obtener zonas
      const zonas = await this.establecimientosApi.getZonasApi(this.tokenApi).toPromise();
      this.listadoZonas = zonas!;
      // Suscribirse al observable para obtener las actualizaciones del listado de zonas
      this.zonasSubscription = this.establecimientosApi.zonas$.subscribe(zonas => {
        this.listadoZonas = zonas;
      });
    } catch (error) {
      console.error('Error al obtener zonas:', error);
      // Manejar el error según sea necesario
    }
  }

  // Método que redirige hacia la edición de una zona en específica
  public goToEditZona(id: number) {
    this.router.navigate(['admin/zonas/edit', id]);
  }

  // Método que redirige hacia la eliminación de una zona en específica
  public goToDeleteZona(id: number) {
    this.router.navigate(['admin/zonas/delete', id]);
  }

  // Función para capitalizar el primer carácter
  public capitalizarPalabra(sentence: string): string {
    // Separar el string en palabras individuales
    const words = sentence.split(' ');

    // Convertir la primera letra de cada palabra en minúscula y dejar el resto sin cambios
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Unir las palabras nuevamente en un solo string
    const result = capitalizedWords.join(' ');

    return result;
  }



}
