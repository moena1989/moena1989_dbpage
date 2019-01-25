import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {DbService} from '../../_services/db.service';
import {ToolsService} from '../../_services/tools.service';
import {CurrentStorageService} from '../../_services/current-storage.service';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('modal') modal: NgxSmartModalComponent;
  err_msg: string;
  menu_state = true;
  faCoffee = faCoffee;
  regs = false;

  constructor(public db: DbService, public router: Router, private tool: ToolsService, private currentStorage: CurrentStorageService) {
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
      this.menu_state = true;
    } else {
      this.menu_state = false;
    }
  }

}
