import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AuthApiService } from '../../services/authApi.service';

import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent {

  private usuariosSubscription!: Subscription;

  public listadoUsuarios: UsuarioApi[] = [];

  public tokenApi : string = "";

  constructor(
    public router: Router,
    private authApi: AuthApiService
  ){}

  async ngOnInit(){
    try {

      this.tokenApi = sessionStorage.getItem('tokenApi')!;

      // Obten las zonas al iniciar el componente
      await this.obtenerUsuarios();
    } catch (error) {
      console.error('Error en ngOnInit:', error);
      // Manejar el error según sea necesario
    }

  }

  ngOnDestroy() {
    // Desuscribe la suscripción al salir del componente para evitar posibles fugas de memoria
    this.usuariosSubscription.unsubscribe();
  }

  async obtenerUsuarios() {
    try {

      const usuarios = await this.authApi.getUsersApi(this.tokenApi).toPromise();
      this.listadoUsuarios = usuarios!;
      // Suscríbete al observable para obtener las actualizaciones del listado de categorías
      this.usuariosSubscription = this.authApi.usuarios$.subscribe(usuarios => {
        this.listadoUsuarios = usuarios;
      });

    } catch (error) {
      console.error('Error al obtener zonas:', error);
      // Manejar el error según sea necesario
    }
  }


  public goToEditZona(id: string) {
    this.router.navigate(['admin/usuarios/edit', id]);
  }

  public goToDeleteZona(id: string) {
    this.router.navigate(['admin/usuarios/delete', id]);
  }

}
