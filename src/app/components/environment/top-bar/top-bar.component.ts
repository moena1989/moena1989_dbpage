import {Component, OnInit} from '@angular/core';
import {DbManagerService} from '../../../services/db-manager.service';
import {SettingsService} from '../../../services/settings.service';
import {AuthService} from '../../../services/routes/auth.service';



@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  titulo_actual;

  constructor(public db: DbManagerService, public tools: SettingsService, private auth: AuthService) {
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
