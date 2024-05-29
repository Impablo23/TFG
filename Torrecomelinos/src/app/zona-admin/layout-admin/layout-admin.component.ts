import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.css']
})
export class LayoutAdminComponent implements OnInit  {

  // Variable para almacenar el nombre del Administrador
  public nombrePublico ='';

  // Método para cuando se inicie la página, se de valor al nombrePublico el nombre del Administrador.
  ngOnInit(): void {
    this.nombrePublico = sessionStorage.getItem('nombreCompleto')!;
  }

  // Variable para almacenar el nombre y ruta de las diferentes opciones de gestión que tiene el Administrador.
  public AdminItems = [
    {label: 'Gestión de Zonas', icon: 'playlist_add', url: 'admin/zonas'},
    {label: 'Gestión de Categorías', icon: 'playlist_add', url: 'admin/categorias'},
    {label: 'Gestión de Usuarios', icon: 'playlist_add', url: 'admin/usuarios'},
    {label: 'Gestión de Sugerencias', icon: 'playlist_add', url: 'admin/sugerencias'},
    {label: 'Registro de Actividad', icon: 'playlist_add', url: 'admin/registro'},
  ]

  // Constructor
  constructor(
    private router: Router,
  ){}

  // Método que redirige hacia la pagína principal de establecimientos
  public goToApp() {
    this.router.navigate(['/establecimientos']);
  }

  // Método que redirige hacia las distintas rutas de opciones de gestion que tiene el Administrador.
  public goToUrl(url: string) {
    this.router.navigate([url]);
  }

}
