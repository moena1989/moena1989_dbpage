import {Component, OnInit} from '@angular/core';
import {DbManagerService} from '../../../services/db-manager.service';
import {ToolsServices} from '../../../services/tools-services.service';
import {AuthService} from '../../../services/routes/auth.service';
import {CurrentStorageService} from '../../../services/current-storage.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  typeName = 'Piezas';
  iconStyle = ToolsServices.iconStyle;

  constructor(public db: DbManagerService, public tools: ToolsServices,
              public current: CurrentStorageService, private auth: AuthService, private router: Router) {
  }

  ngOnInit() {

  }

  logout() {
    this.auth.logout();
  }

  alPresionarMenu() {
    this.tools.isMenuOpened = !this.tools.isMenuOpened;
  }

  chageTypeProductConfig(c: any) {
    document.body.style.setProperty(`--main-color`, c.color);
    // this.current.whenChange.emit(c);
    this.current.productSelected = c;
  }
}
