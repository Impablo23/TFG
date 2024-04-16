import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegistroApi } from 'src/app/interfaces/registroApi.interface';
import { AuthApiService } from 'src/app/services/authApi.service';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';
import { EstablecimientosApiService } from 'src/app/services/establecimientosApi.service';
import { Respuesta } from '../../interfaces/respuesta.interface copy';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public idRol : string ='';
  public nombre : string ='';
  public id : string ='';

  public numFav : number = 0;

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private establecimientosJsonService: EstablecimientosJsonService,
    private establecimientoApi: EstablecimientosApiService,
    private authApi: AuthApiService
  ){}

  ngOnInit() {
    this.idRol = localStorage.getItem('idRol')!;
    this.nombre = localStorage.getItem('nombreCompleto')!;
    this.id = localStorage.getItem('id')!;

    this.numFavoritosApi();
  }

  public sidebarItems = [
    {label: 'Listado', icon: 'label', url: './list'},
    {label: 'Búsqueda', icon: 'search', url: './search'},
  ]

  public AdminItems = [
    {label: 'Zona Administrador', icon: 'settings_accessibility', url: '/admin'},
  ]

  public FavoriteItems = [
    {label: 'Mis Lugares Favoritos', icon: 'star', url: './favourite-list'}
  ]


  public navega(url: string):void {
    this.router.navigate([`${url}`]);
  }

  public logout(): void {

    const registroLoGout: RegistroApi = {
      id: 0,
      id_usuario: parseInt(this.id,10),
      estado: 'Desconectado'
    }

    this.authApi.addRegistroApi(registroLoGout).subscribe(
      respuesta => {
        this.snackbar.open("Se ha Cerrado Sesión correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
        this.router.navigate(['/auth']);
        localStorage.clear();
      }
    );

  }

  // public numFavoritos(): void {
  //   this.establecimientosJsonService.getFavoritosByUser(this.id).subscribe(
  //     favoritos => {
  //       this.numFav = favoritos.length;
  //     }
  //   );
  // }

  public numFavoritosApi(): void {
    this.establecimientoApi.getFavoritosByUserApi(parseInt(this.id,10)).subscribe(
      favoritos => {
        this.numFav = favoritos.length;
      }
    );
  }

  public verificaFavoritos(): boolean {
    let ok = false;
    if (this.numFav>0){
      ok = true;
    }
    return ok;
  }

}
