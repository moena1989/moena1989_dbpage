import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {DbService} from '../../_services/db.service';
import {ToolsService} from '../../_services/tools.service';
import {CurrentStorageService} from '../../_services/current-storage.service';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('modal') modal: NgxSmartModalComponent;
  err_msg: string;
  is_menu_opened = true;
  regs = false;

  constructor(public db: DbService, public router: Router, private tools: ToolsService, private currentStorage: CurrentStorageService) {
  }

  ngOnInit() {
    this.comprobarMenu();
  }

  cerrarCuenta() {
    this.db.logOut();
    this.router.navigate(['/logIn']);
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
