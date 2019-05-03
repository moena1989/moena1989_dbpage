import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {DbManagerService} from '../../../services/db-manager.service';
import {ToolsServices} from '../../../services/tools-services.service';
import {CurrentStorageService} from '../../../services/current-storage.service';

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

  constructor(public db: DbManagerService,
              public router: Router,
              public tools: ToolsServices,
              private currentStorage: CurrentStorageService) {
  }

  ngOnInit() {
    this.comprobarMenu();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.comprobarMenu();
  }

  comprobarMenu() {  // el menú siempre estará abierto en modo escritorio
    if (window.innerWidth > 640) {
      this.is_menu_opened = true;
    } else {
      this.is_menu_opened = false;
    }
  }

}
