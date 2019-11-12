import {Component, OnInit} from '@angular/core';
import {DbManagerService} from '../../../services/db-manager.service';
import {ToolsServices} from '../../../services/tools-services.service';
import {AuthService} from '../../../services/routes/auth.service';
import {BeforeAppInitService} from '../../../services/before-app-init.service';
import {Router} from '@angular/router';
import {CurrentDataService} from '../../../current-data.service';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  typeName = 'Piezas';
  iconStyle = ToolsServices.iconStyle;
  scrumBreads: string[] = [];
  selectedTab: any;
  tabsData = CurrentDataService.topTabs;

  constructor(public db: DbManagerService, public tools: ToolsServices, private global: CurrentDataService,
              public current: BeforeAppInitService, private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.scrumBreads = CurrentDataService.currentRouteInfo.scrumBreads;
    this.selectedTab = this.global.currentSelectedTab;
    this.global.tobTabsEmitter.subscribe(value => {
      this.tabsData = value;
      this.scrumBreads = CurrentDataService.currentRouteInfo.scrumBreads;
      this.selectedTab = this.global.currentSelectedTab;
    });

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

  toggleMenu() {
    CurrentDataService.toggleMenu = !CurrentDataService.toggleMenu;
  }
}
