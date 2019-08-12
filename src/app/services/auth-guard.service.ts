import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CurrentStorageService} from './current-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private current: CurrentStorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.current.userData) {
      this.router.navigate(['login']).then();
      return false;
    } else {
      console.log('USUARIO HABILITADO');
      return true;
    }
  }

  private isEmailValido(email: string) {
    const user = email.split('@')[0];
    const domain = email.split('@')[1];
    return domain === 'moena1989.com';
  }
}
