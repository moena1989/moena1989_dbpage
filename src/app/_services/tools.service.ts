import {Injectable} from '@angular/core';
import {SnackbarComponent} from '../tools/snackbar/snackbar.component';
import {CanActivate, Router} from '@angular/router';
import {Ng2ImgMaxService} from 'ng2-img-max';
import {DbService} from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsService implements CanActivate {
  public snack: SnackbarComponent;
  private MAX_SIZE_IN_PX = 2500;
  private MAX_SIZE_IN_MB = 0.7;
  public top_tittle = 'holi';
  public show_menu = true;
  public show_windows_tittle_bar = false;
  public gUser: any = {};

  constructor(public router: Router, private ng2ImgMax: Ng2ImgMaxService) {

  }

  canActivate(): boolean {
    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['logIn']);
    //   return false;
    // }
    return true;
  }

  comprimir(file, al_finalizar: (result: any) => void) {
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }

    // this.message = 'Cambiar Imagen';
    // this.imagePath = file;
    // this.message = 'Escalando...';

    this.ng2ImgMax.resizeImage(file, 10000, this.MAX_SIZE_IN_PX).subscribe(
      result => {
        console.log('probando resize');
        // this.message = 'Comprimiendo...';
        this.ng2ImgMax.compressImage(result, this.MAX_SIZE_IN_MB).subscribe(
          _result => {
            console.log('probando compress');
            al_finalizar(_result);
          },
          error => {
            console.log('😢 Oh no!', error);
          }
        );
      },
      error => {
        console.log('😢 Oh no! error al comprimir', error);
      }
    );
  }

  cerrarSesion() {
    //   console.log('redireccionando a login...');
    //   this.authService.signOut().then(value => {
    //     this.router.navigate(['/logIn']);
    //   });
  }
}
