import {Component, OnInit, ViewChild} from '@angular/core';
import {SnackbarComponent} from './tools/snackbar/snackbar.component';
import {ToolsServices} from './services/tools-services.service';
import {SHOW_WINDOWS_BAR} from '../db/dbConfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(SnackbarComponent, {static: false})
  public snack: SnackbarComponent;
  public showBar = SHOW_WINDOWS_BAR;
  const;

  // customTitlebar = require('custom-electron-titlebar');
  /**
   * Esta clase se encarga de iniciar toods los sevicios apenas alguien entre a la pag.
   * Contiene el snakBar
   */
  constructor(public tools: ToolsServices) {
  }

  ngOnInit() {
  }
}
