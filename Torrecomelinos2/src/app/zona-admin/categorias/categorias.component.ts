import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {

  private categoriasSubscription!: Subscription;

  // Variable que almacena las categorías recogidas de la BBDD.
  public listadoCategorias: CategoriaApi[] = [];

  public tokenApi : string = "";


  // Constructor
  constructor(
    public router: Router,
    private establecimientosApi: EstablecimientosApiService
  ){}

  // Método que al iniciar la página, se cargar las categorias.
  ngOnInit(){

    this.tokenApi = localStorage.getItem('tokenApi')!;
    // Suscríbete al observable para obtener las actualizaciones del listado de categorías
    this.categoriasSubscription = this.establecimientosApi.categorias$.subscribe(categorias => {
      this.listadoCategorias = categorias;
    });

    // Obten las categorías al iniciar el componente
    this.establecimientosApi.getCategoriasApi(this.tokenApi).subscribe();
  }

  ngOnDestroy() {
    // Desuscribe la suscripción al salir del componente para evitar posibles fugas de memoria
    this.categoriasSubscription.unsubscribe();
  }

  // Método que redirige hacia la edición de una zona en específica
  public goToEditZona(id: number) {
    this.router.navigate(['admin/categorias/edit', id]);
  }

  // Método que redirige hacia la eliminación de una zona en específica
  public goToDeleteZona(id: number) {
    this.router.navigate(['admin/categorias/delete', id]);
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
