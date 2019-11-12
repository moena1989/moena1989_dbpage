import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {DbSelectorService} from '../db-selector.service';
import {CurrentDataService} from '../current-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router,
              private dbs: DbSelectorService,
              private currentData: CurrentDataService,
              private _firebaseAuth: AngularFireAuth) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (!this.current.userData) {
    //   this.router.navigate(['/login']).then();
    //   return false;
    // } else {
    //   console.log('User logged');
    return this.autoAuth();
    // }
  }

  autoAuth(): Promise<boolean> {
    // console.log('Loading auto auth...');
    // this.globalData.currentSelectedTab
    return new Promise(resolve => {
      console.log('initializing autoAuth');
      // todo: remplzar por this.dbs...
      this._firebaseAuth.authState.subscribe(
        (user) => {
          if (user) {
            // console.log(user.uid);
            // console.log('auth suscription: actived');
            // todo: ¿Cómo hago para que mainDb vea a current?
            this.dbs.getUserData(user.uid).pipe(take(1)).subscribe(datosUsuario => {
              console.log(datosUsuario);
              if (datosUsuario) {
                console.log('user logged');
                resolve(true);
                CurrentDataService.userData = datosUsuario[0];
              } else {
                console.log('user not logged');
                resolve(false);
                this.router.navigate(['/login']).then();
                CurrentDataService.userData = null;
              }
            });
          } else {
            resolve(false);
            this.router.navigate(['/login']).then();
            console.log('el usuario', undefined);
          }
        }
      );
    });
  }
}
