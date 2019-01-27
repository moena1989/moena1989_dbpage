import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DbService} from './db.service';
import {ToolsService} from './tools.service';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private db: DbService, private tools: ToolsService, private auth: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.auth.isLoggedIn());
    if (this.auth.isLoggedIn()) {
      console.log('el guardia te habilitó ');
      // this.tools.gUser = this.db.currentUser();
      return true;
    } else {
      this.router.navigate(['logIn']);
      return false;
    }
  }
}
