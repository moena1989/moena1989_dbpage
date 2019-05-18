import {Component, OnInit} from '@angular/core';
import {DbManagerService} from '../../../services/db-manager.service';
import {ToolsServices} from '../../../services/tools-services.service';
import {AuthService} from '../../../services/routes/auth.service';
import {CurrentStorageService} from '../../../services/current-storage.service';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  titulo_actual;

  faIco = 'fa-puzzle-piece';
  typeProduct = 'Relojes';
  typeName = 'Piezas';
  productSelected = 'Relojería';

  constructor(public db: DbManagerService, public tools: ToolsServices,
              public current: CurrentStorageService, private auth: AuthService) {
  }

  ngOnInit() {
  }

  cerrarSesion() {
    this.auth.logout();
  }

  alPresionarMenu() {
    this.tools.isMenuOpened = !this.tools.isMenuOpened;
  }

  selectProduct(c: any) {
    this.productSelected = c;
  }
}
