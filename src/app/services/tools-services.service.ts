import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Ng2ImgMaxService} from 'ng2-img-max';
import {MAX_SIZE_IN_MB, MAX_SIZE_IN_PX, SUPPORTED_LINES_PRODUCTS} from '../../environments/environment';
import {CurrentStorageService} from './current-storage.service';
import {DbSelectorService} from '../db-selector.service';
import {Subscription} from 'rxjs';

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
  dynamicTabs: any = [];
  currentSelectedTab: any = undefined;
  private susDynamicData: Subscription = undefined;
  private currentD: any;

  constructor(public router: Router, private ng2ImgMax: Ng2ImgMaxService,
              private currentData: CurrentStorageService, private dbm: DbSelectorService) {
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
        this.ng2ImgMax.compressImage(result, MAX_SIZE_IN_MB).subscribe(
          _result => {
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

  setUpDynamicData(dynamicTabsData: any) {
    if (!dynamicTabsData) {
      this.dynamicTabs = [];
      console.log('There is no DynamicTabsData... ');
      return;
    }
    if (this.susDynamicData !== undefined) {
      this.susDynamicData.unsubscribe();
    }
    this.susDynamicData = this.dbm.getItems(dynamicTabsData.dbParams.iddb, dynamicTabsData.dbParams.typeProduct,
      dynamicTabsData.dbParams.category, dynamicTabsData.dbParams.itemType).subscribe(value => {
      const nTabs = [];
      value.forEach((value1: any) => {
        // se crea el objeto dynamic tab
        const dtab = {
          path: dynamicTabsData.path,
          name: value1.name,
          queryParams: {id: value1.metadata.id}
        };
        nTabs.push(dtab);
      });
      this.dynamicTabs = nTabs;
    });
  }

  setNewTabs(file: any, category: string) {
    // if (t!his.selectedItemTab == file) {
    this.availableTabs = file.tabs;
    this.currentData.topBar.pageTittle = file.name;
    this.currentData.topBar.subPageTittle = category;
    this.currentData.topBar.faIcon = file.icon;
    this.setUpDynamicData(file.dynamicTabsData);
    this.router.navigate([file.tabs[0].path]);
    // }
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
              this.setUpDynamicData(val3.dynamicTabsData);
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
