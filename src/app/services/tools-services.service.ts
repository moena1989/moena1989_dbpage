import {Injectable} from '@angular/core';
import {SnackbarComponent} from '../tools/snackbar/snackbar.component';
import {CanActivate, Router} from '@angular/router';
import {Ng2ImgMaxService} from 'ng2-img-max';
import {MAX_SIZE_IN_MB, MAX_SIZE_IN_PX} from '../environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ToolsServices implements CanActivate {

  // --
  public snack: SnackbarComponent;
  public isMenuOpened = true;
  public gUser: any = {};
  public version = 'M89DB-1.1a';
  public urlDomain = 'http://localhost:4200';
  //////
  public localApp = 'es';
  //////
  public tituloTopbar = 'Testing';
  public defaultCodeLang = 'es';
  public defaultSymbolCurr = 'US$';

  constructor(public router: Router, private ng2ImgMax: Ng2ImgMaxService) {

  }

  canActivate(): boolean {
    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['logIn']);
    //   return false;
    // }
    return true;
  }

  beforeInit() {
  }

  compressImage(file, al_finalizar: (result: any) => void) {
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      console.error('Only images are supported.');
      return;
    }
    this.ng2ImgMax.resizeImage(file, 10000, MAX_SIZE_IN_PX).subscribe(
      result => {
        console.log('probando resize');
        // this.message = 'Comprimiendo...';
        this.ng2ImgMax.compressImage(result, MAX_SIZE_IN_MB).subscribe(
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
        console.log('😢 Oh no! error al compressImage', error);
      }
    );
  }
}
