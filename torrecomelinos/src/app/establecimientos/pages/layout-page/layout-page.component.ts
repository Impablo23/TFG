import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public sidebarItems = [
    {label: 'Listado', icon: 'label', url: './listado'},
    {label: 'Búsqueda', icon: 'search', url: './search'},
    {label: 'Lugares Favoritos', icon: 'star', url: './new-hero'}
  ]

  public AdminItems = [
    {label: 'Zona Administrador', icon: 'settings_accessibility', url: '/usuarios'},
  ]

}
