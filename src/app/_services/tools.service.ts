import {Injectable} from '@angular/core';
import {SnackbarComponent} from '../snackbar/snackbar.component';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ToolsService implements CanActivate {
  public snack: SnackbarComponent;

  constructor(public router: Router) {

  }

  canActivate(): boolean {
    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['login']);
    //   return false;
    // }

    return true;
  }

}
