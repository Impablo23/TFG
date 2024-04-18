import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent {

  private zonasSubscription!: Subscription;

  // Variable para almacenar las zonas recogidad de la BBDD
  public listadoZonas: ZonaApi[] = [];

  // Constructor
  constructor(
    public router: Router,
    private establecimientosApi: EstablecimientosApiService
  ){}

  // Método que al iniciar la página, se cargar las zonas.
  ngOnInit(){
    // Suscríbete al observable para obtener las actualizaciones del listado de zonas
    this.zonasSubscription = this.establecimientosApi.zonas$.subscribe(zonas => {
      this.listadoZonas = zonas;
    });

    // Obten las zonas al iniciar el componente
    this.establecimientosApi.getZonasApi().subscribe();
  }

  ngOnDestroy() {
    // Desuscribe la suscripción al salir del componente para evitar posibles fugas de memoria
    this.zonasSubscription.unsubscribe();
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
