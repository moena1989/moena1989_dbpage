import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DbService} from './db.service';
import {AuthService} from 'angularx-social-login';
import {ToolsService} from './tools.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private db: DbService, private auth: AuthService, private tools: ToolsService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.router.navigate(['/logIn']);
    // return false;
    // TODO revisar bien como funciona el auth del log, para evitar recargar la pagina todo el tiempo
    // const osb = localStorage.getItem('ob_login');
    // if (osb != null) {
    //   console.log('Se encontró el ob_log y se cargo :D');
    //   this.db.authState = osb;
    //   // this.db.buscarDatosUsuarios(osb, () => {
    //   // });
    // } else {
    //   console.log('no existe save guardado');
    //   return false;
    // }
    //
    // if (!this.db.authenticated) {
    //   this.router.navigate(['/logIn']);
    //   console.log('Usuario sin autenticar. Redireccionando...');
    //   // TODO, cambiar al hcaer las pruebas
    //   return true;
    // }
    // console.log();
    console.log('probando guardia');
    // return new Promise((resolve) => {
    //   resolve(true);
    //   this.auth.authState.subscribe(user => {
    //     console.log(user);
    //     console.log('asjbdv');
    //     if (user !== undefined) {
    //       // usuario logueado
    //       // this.router.navigate(['/dashboard']);
    //       // this.tools.gUser = user;
    //       resolve(true);
    //     } else {
    //       // usuario no logueado
    //       this.router.navigate(['logIn']);
    //       resolve(false);
    //     }
    //   }, error1 => {
    //     console.log(error1);
    //   });
    // });
    return true;
  }
}
