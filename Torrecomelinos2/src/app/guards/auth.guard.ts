import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      console.log('perita');
      return true;
    } else {
      console.log('malll');
      this.router.navigate(['/auth']);
      return false;
    }
  }
}


@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate {

  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      console.log('malll');
      this.router.navigate(['/establecimientos']);
      return false;
    } else {
      console.log('perita');
      return true;
    }
  }
}


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const idRol = localStorage.getItem('idRol');

    if (!token || !idRol) {
      // Si el usuario no tiene un token o idRol, significa que no está autenticado
      // Redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['/auth']);
      return false;
    } else if (idRol === '2') {
      // Si el usuario está autenticado pero su idRol no es '2', significa que no tiene acceso de administrador
      // Redirigir al usuario a una página de acceso no autorizado
      this.router.navigate(['/establecimientos']);
      return false;
    }

    // Si el usuario tiene un token y idRol es '2', permitir el acceso a la ruta de administrador
    return true;
  }
}
