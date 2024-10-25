import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { CategoriaApi } from 'src/app/interfaces/categoriaApi.interface';
import { Subscription } from 'rxjs';
import { AuthApiService } from 'src/app/services/authApi.service';

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
    private establecimientosApi: EstablecimientosApiService,
    private authApi: AuthApiService
  ){}

  // Método que al iniciar la página, se cargar las categorias.
  async ngOnInit(){
    try {

      this.tokenApi = sessionStorage.getItem('tokenApi')!;

      // Obten las zonas al iniciar el componente
      await this.obtenerCategorias();
    } catch (error) {
      console.error('Error en ngOnInit:', error);
      // Manejar el error según sea necesario
    }

  }

  ngOnDestroy() {
    // Desuscribirse del observable al salir del componente para evitar posibles fugas de memoria
    if (this.categoriasSubscription) {
      this.categoriasSubscription.unsubscribe();
    }
  }

  async obtenerCategorias() {
    try{
      // Obtener zonas
      const categorias = await this.establecimientosApi.getCategoriasApi(this.tokenApi).toPromise();
      this.listadoCategorias = categorias!;
      // Suscribirse al observable para obtener las actualizaciones del listado de zonas
      this.categoriasSubscription = this.establecimientosApi.categorias$.subscribe(categorias => {
        this.listadoCategorias = categorias;
      });
    }catch (error) {
      console.error('Error al obtener zonas:', error);
    }
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
