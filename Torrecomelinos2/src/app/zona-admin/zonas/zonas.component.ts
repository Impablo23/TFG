import { Component } from '@angular/core';
import { EstablecimientosJsonService } from '../../services/establecimientos.service';
import { Router } from '@angular/router';
import { Zona } from 'src/app/interfaces/zona.interface';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';
import { ZonaApi } from 'src/app/interfaces/zonaApi.interface';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent {


  constructor(public router: Router,private establecimientosJsonService: EstablecimientosJsonService ,private establecimientosApi: EstablecimientosApiService ){}

  ngOnInit(){
    this.listarZonas();
  }
  public listadoZonas: ZonaApi[] = [];

  public listarZonas(){
    this.establecimientosApi.getZonasApi().subscribe(
      zonas => {
        this.listadoZonas = zonas;
      }
    );
  }

  public goToEditZona(id: number) {
    this.router.navigate(['admin/zonas/edit', id]);
  }

  public goToDeleteZona(id: number) {
    this.router.navigate(['admin/zonas/delete', id]);
  }



}
