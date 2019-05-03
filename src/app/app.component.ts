import {Component, OnInit, ViewChild} from '@angular/core';
import {SnackbarComponent} from './tools/snackbar/snackbar.component';
import {ToolsServices} from './services/tools-services.service';
import {DEFAULT_CODE_LANG} from './environment/enviroment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(SnackbarComponent)
  public snack: SnackbarComponent;
  public showBar = DEFAULT_CODE_LANG;

  /**
   * Esta clase se encarga de iniciar toods los sevicios apenas alguien entre a la pag.
   * Contiene el snakBar
   */
  constructor(public tools: ToolsServices) {
  }

  ngOnInit() {

    this.tools.snack = this.snack;
  }
}
