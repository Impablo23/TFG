import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.css']
})
export class LayoutAdminComponent implements OnInit  {

  public nombrePublico ='';

  ngOnInit(): void {
    this.nombrePublico = localStorage.getItem('nombreCompleto')!;
  }

  public AdminItems = [
    {label: 'Gestión de Zonas', icon: 'playlist_add', url: 'admin/zonas'},
    {label: 'Gestión de Categorías', icon: 'playlist_add', url: 'admin/categorias'},
    {label: 'Gestión de Usuarios', icon: 'playlist_add', url: 'admin/usuarios'},
  ]

  constructor(
    private router: Router,
  ){}

  public goToApp() {
    this.router.navigate(['/establecimientos']);
  }

  public goToUrl(url: string) {
    console.log('Navigating to:', url);
    this.router.navigate([url]);
  }

}
