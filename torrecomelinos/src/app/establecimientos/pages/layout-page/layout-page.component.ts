import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthJsonService } from 'src/app/services/authJson.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public nombre_publico! : string;

  constructor(private authJsonService: AuthJsonService, private router : Router){}

  public sidebarItems = [
    {label: 'Listado', icon: 'label', url: './listado'},
    {label: 'Búsqueda', icon: 'search', url: './search'},
    {label: 'Lugares Favoritos', icon: 'star', url: './new-hero'}
  ]

  public AdminItems = [
    {label: 'Zona Administrador', icon: 'settings_accessibility', url: '/usuarios'},
  ]

  ngOnInit(): void {
    this.nombre_publico = localStorage.getItem('nombreCompleto')!;
  }

  onLogOut() {
    this.authJsonService.logout()
    setTimeout(() => {
      this.router.navigate(['/auth'])
    }
    , 1000);
  }

}
