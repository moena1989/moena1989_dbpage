import {Component, OnInit} from '@angular/core';
import {ToolsServices} from '../../../services/tools-services.service';
import {CurrentStorageService} from '../../../services/current-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public tools: ToolsServices, public current: CurrentStorageService) {
  }

  ngOnInit() {
    this.current.topBar.pageTittle = 'Inicio';
    this.current.topBar.faIcon = 'fa-home';
  }

  probar() {
    // this.pdb.tst();
  }
}
