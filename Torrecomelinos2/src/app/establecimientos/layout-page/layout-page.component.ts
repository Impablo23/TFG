import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public idRol : string ='';
  public nombre : string ='';

  constructor(
    private router: Router,
    private snackbar: MatSnackBar
  ){}

  ngOnInit() {
    this.idRol = localStorage.getItem('idRol')!;
    this.nombre = localStorage.getItem('nombreCompleto')!;
  }

  public sidebarItems = [
    {label: 'Listado', icon: 'label', url: 'establecimientos/list'},
    {label: 'Búsqueda', icon: 'search', url: './search'},
    {label: 'Lugares Favoritos', icon: 'star', url: './'}
  ]

  public AdminItems = [
    {label: 'Zona Administrador', icon: 'settings_accessibility', url: '/usuarios'},
  ]

  public navega(url: string):void {
    this.router.navigate([url]);
  }

  public logout(): void {
    localStorage.clear();
    this.snackbar.open("Se ha Cerrado Sesión correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
    this.router.navigate(['/auth']);
  }

}
