import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import * as CryptoJS from 'crypto-js';

import { AuthApiService } from 'src/app/services/authApi.service';

import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';
import { RolApi } from 'src/app/interfaces/rolApi.interface';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent {

  // Constructor
  constructor(private router: Router,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private authApi: AuthApiService
  ){}

  // Variables del formulario de Register
  nombreCompleto: string ='';
  email: string ='';
  pass: string ='';
  idRol: number = 0;
  verificado: number = 0;

  public tokenApi : string = '';

  // Variables para almacenar los roles y el usuario seleccionado
  public usuarioSeleccionado! : UsuarioApi ;
  public listadoRoles: RolApi[] = [];

  // Función para calcular el hash MD5 de una contraseña
  calcularHashMD5(password: string): string {
    return CryptoJS.MD5(password).toString();
  }

  // Método para cancelar operacion y redirige hacia el apartado de inserccion de usuarios.
  public cancelar() {
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
    this.router.navigate(['admin/usuarios']);
  }

  // Método que dependiendo de si comple las condiciones se mostrara el botón de aceptar o no el proceso.
  public verificaCampos(): boolean {
    if (this.email === '' || this.pass === '' || this.nombreCompleto === '' || this.idRol === 0) {
      return false;
    }else{
      return true;
    }
  }

  /*
  Método que cuando inicie la página, se buscara el usuario con el id seleccionado para almacenar en la variable anterioir los datos y
  mostrarlos en el formulario y recoge los datos sobre los roles de la BBDD y los guarda en la lista
  */
 async ngOnInit(): Promise<void> {

    this.tokenApi = sessionStorage.getItem('tokenApi')!;

    await this.authApi.getUsersApi(this.tokenApi).toPromise();

    const response = await this.authApi.getRoles().toPromise();
    this.listadoRoles = response!;


   this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.authApi.getUsersApiById(id,this.tokenApi) )  ).subscribe(  usuario =>
    {
      if (!usuario) return this.router.navigate(['/usuarios']);
      this.usuarioSeleccionado = usuario[0];

      //Datos del formulario ya rellenos
      this.email = this.usuarioSeleccionado.email;
      this.nombreCompleto = this.usuarioSeleccionado.nombreCompleto;
      this.pass = this.usuarioSeleccionado.passwd;
      this.idRol = this.usuarioSeleccionado.idRol;
      this.verificado = this.usuarioSeleccionado.verificado;
      return;
    });


  }


  verificar() {
    this.verificado = 1;
  }

  noVerificar() {
    this.verificado = 0;
  }

  /*
  Método para editar el usuario en comprueba de que el email no exista en la BBDD y que estén todos los campos rellenos y si eso esta OK
  procede a añadir el usuario a la BBDD dándole los valores que ha introducido el usuario mas el idRol = 2 y el tokenApi vacío y si está NO OK
  le notifica que el usuario está ya registrado
  */
  public async editUsuarioApi() {

    if (this.nombreCompleto.length<5){
      this.snackbar.open("El nombre debe tener un mínimo de 5 caracteres", "Cerrar", { duration: 2000, panelClass: ['background'] });
      return;
    }

    if (this.pass.length < 8) {
      this.snackbar.open("La contraseña debe tener un mínimo de 8 caracteres", "Cerrar", { duration: 2000, panelClass: ['background'] });
      return;
    }

    const response1 = await this.authApi.getUserByEmail(this.email).toPromise();
    let user = response1![0];

    if (this.usuarioSeleccionado.passwd === this.pass){
      user = {
        id: this.usuarioSeleccionado.id,
        email: this.email,
        nombreCompleto:this.nombreCompleto,
        passwd:this.usuarioSeleccionado.passwd,
        token:this.usuarioSeleccionado.token,
        idRol:this.idRol,
        verificado: this.verificado
      }
    }else {
      user = {
        id: this.usuarioSeleccionado.id,
        email: this.email,
        idRol:this.idRol,
        nombreCompleto:this.nombreCompleto,
        passwd:this.calcularHashMD5(this.pass),
        token:this.usuarioSeleccionado.token,
        verificado: this.verificado
      }
    }

    this.authApi.updateUserApi(user,this.tokenApi).subscribe(
      (response) => {
        this.snackbar.open("Usuario actualizado correctamente", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {

        });
      },
      (error) => {
        this.snackbar.open("Ha ocurrido un error al actualizar el usuario", "Cerrar",{duration: 2000,panelClass:['background']}).afterDismissed().subscribe(() => {

        });
      }
    );
    this.router.navigate(['admin/usuarios/']);


  }

}
