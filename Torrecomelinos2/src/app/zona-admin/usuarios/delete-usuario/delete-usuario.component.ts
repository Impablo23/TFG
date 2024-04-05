import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthJsonService } from 'src/app/services/authJson.service';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.css']
})
export class DeleteUsuarioComponent {

  public email: string = '';

  public usuarioSeleccionado!: Usuario;

  constructor(
    private authJsonService: AuthJsonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(  ( {id}) => this.authJsonService.getUserById(id) )  ).subscribe(  usuario =>
      {
        if (!usuario) return this.router.navigate(['/usuarios']);

        this.usuarioSeleccionado = usuario[0];
        //Datos del formulario ya rellenos
        this.email  = this.usuarioSeleccionado!.email;

        return;
      });


  }

  public cancelar() {
    this.snackbar.open("Operación cancelada", "Cerrar",{duration: 2000,panelClass:['background']});
    this.email = '';
    this.router.navigate(['admin/usuarios/']);
  }

  public deleteUsuario() {
    this.authJsonService.deleteUser(this.usuarioSeleccionado.id).subscribe(
      (response) => {
        // console.log('perita');
        this.snackbar.open("Usuario eliminada correctamente", "Cerrar",{duration: 2000,panelClass:['background']});
        window.location.reload();
      },
      (error) => {
        // console.log('mal');
        this.snackbar.open("Ha ocurrido un error al eliminar el usuario", "Cerrar",{duration: 2000,panelClass:['background']});
        window.location.reload();
      }
    );
    this.router.navigate(['admin/usuarios/']);
  }

}
