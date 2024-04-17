import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent {

  // Variable para almacenar las zonas recogidad de la BBDD
  public listadoZonas: ZonaApi[] = [];

  // Constructor
  constructor(
    public router: Router,
    private establecimientosApi: EstablecimientosApiService
  ){}

  // Método que al iniciar la página, se cargar las zonas.
  ngOnInit(){
    this.listarZonas();
  }

  // Método que almacena las categorías de la BBDD en el listado de zonas
  public listarZonas(){
    this.establecimientosApi.getZonasApi().subscribe(
      zonas => {
        this.listadoZonas = zonas;
      }
    );
  }

  // Método que redirige hacia la edición de una zona en específica
  public goToEditZona(id: number) {
    this.router.navigate(['admin/zonas/edit', id]);
  }

  // Método que redirige hacia la eliminación de una zona en específica
  public goToDeleteZona(id: number) {
    this.router.navigate(['admin/zonas/delete', id]);
  }



}
