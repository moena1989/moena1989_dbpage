import {Injectable} from '@angular/core';
import {SnackbarComponent} from '../tools/snackbar/snackbar.component';
import {CanActivate, Router} from '@angular/router';
import {Ng2ImgMaxService} from 'ng2-img-max';

@Injectable({
  providedIn: 'root'
})
export class ToolsService implements CanActivate {
  public snack: SnackbarComponent;
  private maxSizePx = 2500;
  private maxSizeMb = 0.7;

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

    this.ng2ImgMax.resizeImage(file, 10000, this.maxSizePx).subscribe(
      result => {
        console.log('probando resize');
        // this.message = 'Comprimiendo...';
        this.ng2ImgMax.compressImage(result, this.maxSizeMb).subscribe(
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
}
