import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sugerencia } from 'src/app/interfaces/sugerencia.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css']
})
export class SugerenciasComponent {

  constructor(public router: Router,private establecimientosJsonService: EstablecimientosJsonService){}

  ngOnInit(){
    this.listarSugerencias();
  }
  public listadoSugerencias: Sugerencia[] = [];

  public listarSugerencias(){
    this.establecimientosJsonService.getSugerencias().subscribe(
      sugerencias => {
        this.listadoSugerencias = sugerencias;
      }
    );
  }

  public goToAddSugerencia(id: string) {
    this.router.navigate(['admin/sugerencias/add', id]);
  }

  public goToDeleteSugerencia(id: string) {
    this.router.navigate(['admin/sugerencias/delete', id]);
  }

}
