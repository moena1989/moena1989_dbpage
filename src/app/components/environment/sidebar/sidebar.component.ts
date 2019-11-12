import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {DbManagerService} from '../../../services/db-manager.service';
import {ToolsServices} from '../../../services/tools-services.service';
import {CurrentDataService} from '../../../current-data.service';
import {AuthService} from '../../../services/routes/auth.service';
import {DEPARTMENT_ROUTES} from '../../../../routeConfig/departmentsRoutes';

// import {DEPARTMENT_ROUTES} from '../../../../../../M89Public/src/routeConfig/departmentsRoutes';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('modal', {static: false}) modal: NgxSmartModalComponent;
  supportedDataLines = [{name: 'lalala'}];
  iconStyle = ToolsServices.iconStyle;
  userData = CurrentDataService.userData;
  private r = false;

  constructor(public db: DbManagerService,
              public router: Router,
              public auth: AuthService,
              private currentData: CurrentDataService) {
    this.supportedDataLines = DEPARTMENT_ROUTES;
  }

  ngOnInit() {
    this.userData = CurrentDataService.userData;
    // console.error(this.userData);
    this.supportedDataLines = DEPARTMENT_ROUTES;
  }

  toggleMenu() {
    CurrentDataService.toggleMenu = !CurrentDataService.toggleMenu;
  }

  getMenuToggle() {
    return CurrentDataService.toggleMenu;
  }

  openAccountInfo() {
    this.currentData.showAccountInfo();
  }

  logOut() {
    this.auth.logout().then(value => {
      this.router.navigateByUrl('/');
    });
  }
}
