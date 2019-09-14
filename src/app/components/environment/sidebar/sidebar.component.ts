import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {DbManagerService} from '../../../services/db-manager.service';
import {ToolsServices} from '../../../services/tools-services.service';
import {CurrentStorageService} from '../../../services/current-storage.service';
import {SUPPORTED_LINES_PRODUCTS} from '../../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('modal') modal: NgxSmartModalComponent;
  err_msg: string;
  is_menu_opened = true;
  regs = false;
  tendencias: boolean;
  isOptionsOpened = false;
  optionSelected: any = {};
  supportedDataLines = [];
  lineSelected: any;
  currentOpt: any = [];
  iconStyle = ToolsServices.iconStyle;
  selectedItemTab: any;
  private r = false;

  constructor(public db: DbManagerService,
              public router: Router,
              public tools: ToolsServices,
              private currentStorage: CurrentStorageService) {
  }

  ngOnInit() {
    this.supportedDataLines = SUPPORTED_LINES_PRODUCTS;
    this.optionSelected = this.currentStorage.productSelected;
    this.tools.setNewTabsWithUrl(this.router.url);
  }

  selectLineP(line: any) {
    document.body.style.setProperty(`--main-color`, line.color);
    this.isOptionsOpened = !this.isOptionsOpened;
    this.currentStorage.productSelected = line;
    this.optionSelected = this.currentStorage.productSelected;
    console.log(this.currentStorage.productSelected);
  }

  selectR(o: any, category: string) {
    // this.item = o;
    this.tools.setNewTabs(o, category);
    this.currentOpt = o;
  }

  selectLine(line: any) {
    this.isOptionsOpened = !this.isOptionsOpened;
    this.currentStorage.productSelected = line;
    this.optionSelected = this.currentStorage.productSelected;
    console.log(this.currentStorage.productSelected);
  }
}
