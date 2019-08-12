import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Ng2ImgMaxService} from 'ng2-img-max';
import {MAX_SIZE_IN_MB, MAX_SIZE_IN_PX, SUPPORTED_LINES_PRODUCTS} from '../../environments/environment';
import {CurrentStorageService} from './current-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsServices implements CanActivate {
  public static iconStyle = 'far';
  // --
  public SHOW_WINDOWS_TITTLE_BAR = true;
  public isMenuOpened = true;
  public gUser: any = {};
  public version = 'M89DB-1.1a';
  public urlDomain = 'http://localhost:4200';
  //////
  public localApp = 'es';
  //////
  public tituloTopbar = 'Testing';
  //
  availableTabs: any = ['a', 'b'];

  constructor(public router: Router, private ng2ImgMax: Ng2ImgMaxService, private currentData: CurrentStorageService) {

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

  setNewTabs(file: any, category: string) {
    this.availableTabs = file.tabs;
    this.currentData.topBar.pageTittle = file.name;
    this.currentData.topBar.subPageTittle = category;
    this.currentData.topBar.faIcon = file.icon;
    this.router.navigate([file.tabs[0].path]);
  }

  setNewTabsWithUrl(url: string) {
    const s = url.split('/');
    let yes = false;
    // todo: tiene que haber una manera mucho mas óptima de hacer esto.
    for (const val of SUPPORTED_LINES_PRODUCTS) {
      for (const value of val.routes) {
        for (const val3 of value.subCategories) {
          for (const val4 of val3.tabs) {
            // console.log(val4);
            if (val4.path.includes(s[3])) {
              yes = true;
              this.availableTabs = val3.tabs;
              break;
            }
          }
          if (yes) {
            break;
          }
        }
        if (yes) {
          break;
        }
      }
      if (yes) {
        break;
      }
    }
  }
}
