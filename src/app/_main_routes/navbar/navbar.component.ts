import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {DbService} from '../../_services/db.service';
import {ToolsService} from '../../_services/tools.service';
import {CurrentStorageService} from '../../_services/current-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('modal') modal: NgxSmartModalComponent;
  err_msg: string;

  constructor(public db: DbService, public router: Router, private tool: ToolsService, private currentStorage: CurrentStorageService) {
  }

  ngOnInit() {
  }

  cerrarCuenta() {
    this.db.logOut();
    this.router.navigate(['/logIn']);
  }

  // abriModal() {
  //   this.modal.open();
  //   this.err_msg = '';
  // }
}
