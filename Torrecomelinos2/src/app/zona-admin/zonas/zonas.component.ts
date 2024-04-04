import { Component } from '@angular/core';
import { EstablecimientosJsonService } from '../../services/establecimientos.service';
import { Router } from '@angular/router';
import { Zona } from 'src/app/interfaces/zona.interface';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent {


  constructor(public router: Router,private establecimientosJsonService: EstablecimientosJsonService){}

  ngOnInit(){
    this.listarZonas();
  }
  public listadoZonas: Zona[] = [];

  public listarZonas(){
    this.establecimientosJsonService.getZonas().subscribe(
      zonas => {
        this.listadoZonas = zonas;
      }
    );
  }

  public goToEditZona(id: string) {
    this.router.navigate(['admin/zonas/edit', id]);
  }

  public goToDeleteZona(id: string) {
    this.router.navigate(['admin/zonas/delete', id]);
  }



}
