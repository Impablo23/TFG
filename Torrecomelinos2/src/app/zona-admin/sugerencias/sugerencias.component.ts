import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sugerencia } from 'src/app/interfaces/sugerencia.interface';
import { SugerenciaApi } from 'src/app/interfaces/sugerenciaApi.interface';
import { AuthApiService } from 'src/app/services/authApi.service';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css']
})
export class SugerenciasComponent {

  constructor(public router: Router,
    private establecimientosJsonService: EstablecimientosJsonService,
    private establecimientosApi: EstablecimientosApiService,
    private authApi: AuthApiService
  ){}

  ngOnInit(){
    this.listarSugerencias();
  }
  public listadoSugerencias: SugerenciaApi[] = [];

  public listarSugerencias(){
    this.establecimientosApi.getSugerenciasApi().subscribe(
      sugerencias => {
        this.listadoSugerencias = sugerencias;
      }
    );
  }

  public goToAddSugerencia(id: number) {
    this.router.navigate(['admin/sugerencias/add', id]);
  }

  public goToDeleteSugerencia(id: number) {
    this.router.navigate(['admin/sugerencias/delete', id]);
  }

}
