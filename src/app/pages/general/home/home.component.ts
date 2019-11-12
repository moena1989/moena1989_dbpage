import {Component, OnInit} from '@angular/core';
import {ToolsServices} from '../../../services/tools-services.service';
import {BeforeAppInitService} from '../../../services/before-app-init.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public tools: ToolsServices, public current: BeforeAppInitService) {
  }

  ngOnInit() {
    // this.current.topBar.pageTittle = 'Inicio';
    // this.current.topBar.faIcon = 'fa-home';
  }

  probar() {
    // this.pdb.tst();
  }
}
