import { Component, OnInit } from '@angular/core';
import { RegistroApi } from 'src/app/interfaces/registroApi.interface';
import { AuthApiService } from 'src/app/services/authApi.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public listadoRegistros: RegistroApi[] = [];
  public listadoNombresUsuarios: string[] = [];


  constructor(
    private authApi: AuthApiService
  ){}

  ngOnInit(): void {

    this.authApi.getRegistroApi().subscribe(
      registros => {
        this.listadoRegistros = registros;
        this.obtenerNombresUsuarios(this.listadoRegistros);
      }
    );




  }

  obtenerNombresUsuarios(registros: RegistroApi[]): void {
    // this.listadoNombresUsuarios = []; // Limpiar el array antes de agregar nuevos nombres

    registros.forEach(registro => {
      // Obtener el nombre de usuario para cada registro
      this.authApi.getUsersApiById(registro.id_usuario).subscribe(
        usuarios => {
          if (usuarios.length > 0) {
            const nombreUsuario = usuarios[0].email; // Suponiendo que 'nombreCompleto' es el nombre del usuario
            this.listadoNombresUsuarios.push(nombreUsuario);
          }
        },
        error => {
          console.error('Error al obtener el nombre del usuario:', error);
        }
      );
    });
  }





}
