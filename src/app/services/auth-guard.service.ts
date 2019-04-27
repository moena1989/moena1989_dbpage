import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DbManagerService} from './db-manager.service';
import {SettingsService} from './settings.service';
import {AuthService} from './routes/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private db: DbManagerService, private tools: SettingsService, private auth: AuthService) {
  }

  private isEmailValido(email: string) {
    const user = email.split('@')[0];
    const domain = email.split('@')[1];
    return domain === 'gmail.com';
  }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['logIn']);
      return false;
    } else {
      console.log('el guardia te habilitó ');
      // this.tools.gUser = this.db.currentUser();
      return this.isEmailValido(this.tools.gUser.email);
    }
  }
}
