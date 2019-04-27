import {Component, OnInit, ViewChild} from '@angular/core';
import {SnackbarComponent} from './tools/snackbar/snackbar.component';
import {SettingsService} from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(SnackbarComponent)
  public snack: SnackbarComponent;

  /**
   * Esta clase se encarga de iniciar toods los sevicios apenas alguien entre a la pag.
   * Contiene el snakBar
   */
  constructor(public tools: SettingsService) {
  }

  ngOnInit() {

    this.tools.snack = this.snack;
  }
}
