import {Component, OnInit} from '@angular/core';
import {DbManagerService} from '../_services/db-manager.service';
import {ToolsService} from '../_services/tools.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  titulo_actual;

  constructor(public db: DbManagerService, public tools: ToolsService, private auth: AuthService) {
  }

  ngOnInit() {
  }

  cerrarSesion() {
    this.auth.logout();
  }

  alPresionarMenu() {
    this.tools.show_menu = !this.tools.show_menu;
  }
}
