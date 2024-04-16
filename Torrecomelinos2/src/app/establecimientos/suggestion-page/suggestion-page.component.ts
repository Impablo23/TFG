import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Sugerencia } from 'src/app/interfaces/sugerencia.interface';
import { SugerenciaApi } from 'src/app/interfaces/sugerenciaApi.interface';
import { Zona } from 'src/app/interfaces/zona.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

@Component({
  selector: 'app-suggestion-page',
  templateUrl: './suggestion-page.component.html',
  styleUrls: ['./suggestion-page.component.css']
})
export class SuggestionPageComponent {

  public numSugerencias: number = 0;
  public id : string = '';

  ngOnInit() {
    this.id = localStorage.getItem('id')!;
  }

  constructor(
    private router: Router,
    // private establecimientosJsonService: EstablecimientosJsonService,
    private snackbar: MatSnackBar,
    private establecimientoApi: EstablecimientosApiService
  ){}

  public searchForm: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    enlace: new FormControl(''),
  });

  public cancelar() {
    this.router.navigate(['/establecimientos']);
  }

  public addSugerenciaApi() {
    const nomSugerencia: string = this.searchForm.get('nombre')!.value;
    const enlaceSugerencia: string = this.searchForm.get('enlace')!.value;

    if (nomSugerencia === '' || enlaceSugerencia === ''){
      this.snackbar.open("No has rellenado todos los campos obligatorios", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
        // window.location.reload();
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

  // public addSugerencia() {

  //   const nuevaSugerencia: Sugerencia = {
  //     id:
  //   }

  //   this.establecimientosJsonService.addSugerencia()
  // }

  // public addSugerencia() {

  //   const nomSugerencia: string = this.searchForm.get('nombre')!.value;
  //   const enlaceSugerencia: string = this.searchForm.get('enlace')!.value;

  //   this.establecimientosJsonService.getSugerencias().subscribe(
  //     sugerencias => {

  //       // Ver cantidad de zonas para el id.
  //       this.numSugerencias = sugerencias.length;

  //       const nuevaSugerencia: Sugerencia = {
  //         id: (this.numSugerencias+1).toString(),
  //         id_usuario: this.id,
  //         nombre: nomSugerencia,
  //         enlace: enlaceSugerencia
  //       }

  //       if (nomSugerencia === '' || enlaceSugerencia === ''){
  //         this.snackbar.open("No has rellenado todos los campos obligatorios", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
  //           window.location.reload();
  //         });
  //         return;
  //       }

  //       this.establecimientosJsonService.addSugerencia(nuevaSugerencia).subscribe(
  //         (response) => {
  //           this.snackbar.open("Petición enviada correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
  //             this.router.navigate(['/establecimientos']);
  //           });
  //         },
  //         (error) => {
  //           this.snackbar.open("Ha ocurrido un error al enviar la petición", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {
  //             window.location.reload();
  //             this.router.navigate(['/establecimientos']);
  //           });
  //         }
  //       );


  //     }
  //   );


  // }

  //   public addSugerencia() {
  //     const nomSugerencia: string = this.searchForm.get('nombre')!.value;
  //     const enlaceSugerencia: string = this.searchForm.get('enlace')!.value;

  //     this.establecimientosJsonService.getSugerencias().subscribe(
  //         sugerencias => {
  //             // Encontrar el máximo ID actual
  //             let maxId = 0;
  //             sugerencias.forEach(sugerencia => {
  //                 const idNum = parseInt(sugerencia.id);
  //                 if (idNum > maxId) {
  //                     maxId = idNum;
  //                 }
  //             });

  //             // Generar el nuevo ID sumando 1 al máximo ID encontrado
  //             const nuevoId = (maxId + 1).toString();

  //             // Verificar si el nuevo ID ya está en uso
  //             const idExistente = sugerencias.find(sugerencia => sugerencia.id === nuevoId);
  //             if (idExistente) {
  //                 console.error("Error: El ID generado ya está en uso.");
  //                 return;
  //             }

  //             // Crear la nueva sugerencia con el nuevo ID
  //             const nuevaSugerencia: Sugerencia = {
  //                 id: nuevoId,
  //                 id_usuario: this.id,
  //                 nombre: nomSugerencia,
  //                 enlace: enlaceSugerencia
  //             }

  //             // Continuar con el proceso de agregar sugerencia
  //             this.establecimientosJsonService.addSugerencia(nuevaSugerencia).subscribe(
  //                 (response) => {
  //                     this.snackbar.open("Sugerencia enviada correctamente", "Cerrar", { duration: 2000, panelClass: ['background'] }).afterDismissed().subscribe(() => {
  //                         this.router.navigate(['/establecimientos']);
  //                     });
  //                 },
  //                 (error) => {
  //                     this.snackbar.open("Ha ocurrido un error al enviar la sugerencia", "Cerrar", { duration: 2000, panelClass: ['background'] }).afterDismissed().subscribe(() => {
  //                         window.location.reload();
  //                         this.router.navigate(['/establecimientos']);
  //                     });
  //                 }
  //             );
  //         }
  //     );
  // }





}
