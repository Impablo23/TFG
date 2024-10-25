import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthApiService } from 'src/app/services/authApi.service';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';

import { RegistroApi } from 'src/app/interfaces/registroApi.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  // Variables para almacenar el id del rol, nombre e id del usuario
  public idRol : string ='';
  public nombre : string ='';
  public id : string ='';
  public token : string ='';

  // Constructor
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private authApi: AuthApiService
  ){}

  /*
    Método para cuando inicie la página se les den valores a las variables del usuario y al metodo que
    verifica se hay favoritos para mostrar o no el botón para acceder a la página de favoritos.
  */
  async ngOnInit() {

    this.token = sessionStorage.getItem('tokenApi')!;

    this.id = sessionStorage.getItem('id')!;
    this.nombre = sessionStorage.getItem('nombreCompleto')!;
    this.idRol = sessionStorage.getItem('idRol')!;


  }


  // Variable para guardar los datos de los botones de los usuarios.
  public sidebarItems = [
    {label: 'Listado', icon: 'label', url: './list'},
    {label: 'Búsqueda', icon: 'search', url: './search'},
  ]

  // Variable para guardar los datos del boton de los usuarios administradores.
  public AdminItems = [
    {label: 'Zona Administrador', icon: 'settings_accessibility', url: '/admin'},
  ]

  // Variable para guardar los datos del boton de los establecimientos favoritos.
  public FavoriteItems = [
    {label: 'Mis Lugares Favoritos', icon: 'star', url: './favourite-list'}
  ]


  // Método que hace que cuando pulse el boton de la pestaña que deseas te rediriga a esa pagina.
  public navega(url: string):void {
    this.router.navigate([`${url}`]);
  }

  /*
    Método que hace que se cierre sesión añadiendo en el registro de conexciones la desconexion
    y se eliminen los datos del localStorage y le rediriga al login para que al cerrar sesion no le
    de acceso a las pestañas de la aplicación hasta q inicie sesión.
  */
  public logout(): void {

    const registroLoGout: RegistroApi = {
      id: 0,
      id_usuario: parseInt(this.id),
      estado: 'Desconectado',
      hora: this.authApi.obtenerFechaYHora(new Date().toISOString()),
    }


    this.authApi.addRegistroApi(registroLoGout, this.token).subscribe(
      respuesta => {
          // Se ejecuta después de que se agrega el registro
          sessionStorage.clear();
          this.snackbar.open("Se ha Cerrado Sesión correctamente", "Cerrar", { duration: 2000, panelClass: ['background'] });
          this.router.navigate(['/auth']);
      },
      error => {
          console.error("Error al agregar el registro:", error);
          // Si ocurre un error al agregar el registro, también limpiamos sessionStorage y redirigimos al usuario
          // sessionStorage.clear();
          this.snackbar.open("Se ha producido un error al cerrar sesión", "Cerrar", { duration: 2000, panelClass: ['background'] });
          // this.router.navigate(['/auth']);
      }
    );


  }




}
