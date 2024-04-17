import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { SugerenciaApi } from 'src/app/interfaces/sugerenciaApi.interface';

@Component({
  selector: 'app-suggestion-page',
  templateUrl: './suggestion-page.component.html',
  styleUrls: ['./suggestion-page.component.css']
})
export class SuggestionPageComponent {

  // variables para el id de la sugerencia y del usuario
  public numSugerencias: number = 0;
  public id : string = '';

  // Se guarda el id del localStorage en la variable id
  ngOnInit() {
    this.id = localStorage.getItem('id')!;
  }

  // Constructor
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private establecimientoApi: EstablecimientosApiService
  ){}

  // Formulario de la sugerencia
  public searchForm: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    enlace: new FormControl(''),
  });

  // Método para cancelar operación
  public cancelar() {
    this.router.navigate(['/establecimientos']);
  }

  /*
    Método que guarda en constantes los valores que ha introducido el usuario sobre la sugerencia y si los campos no están vacíos se crea la sugerencia para que
    el Administrador la pueda aceptar o rechazar.
  */
  public addSugerenciaApi() {
    const nomSugerencia: string = this.searchForm.get('nombre')!.value;
    const enlaceSugerencia: string = this.searchForm.get('enlace')!.value;

    if (nomSugerencia === '' || enlaceSugerencia === ''){
      this.snackbar.open("No has rellenado todos los campos obligatorios", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
      });
      return;
    }

    const newSugerencia : SugerenciaApi = {
      id: 0,
      id_usuario: parseInt(this.id,10),
      nombre: nomSugerencia,
      enlace: enlaceSugerencia
    }

    this.establecimientoApi.addSugerenciaApi(newSugerencia).subscribe(
        sugerencias => {
          this.snackbar.open("Sugerencia enviada correctamente", "Cerrar", { duration: 2000, panelClass: ['background'] }).afterDismissed().subscribe(() => {
            this.router.navigate(['/establecimientos']);
          });
        }
    );
  }

}
